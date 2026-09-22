-- Profile step uses upsert; anon cannot SELECT rows under current RLS, so PostgREST upsert fails.
-- SECURITY DEFINER RPC performs insert/update without exposing the waitlist to public reads.

CREATE OR REPLACE FUNCTION public.save_alpha_waitlist_profile(
  p_email text,
  p_display_name text DEFAULT NULL,
  p_platform text DEFAULT NULL,
  p_games_played text DEFAULT NULL,
  p_tcg_experience text DEFAULT NULL,
  p_interest text DEFAULT NULL,
  p_discord_username text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_email text := lower(trim(p_email));
BEGIN
  IF normalized_email IS NULL OR normalized_email = '' THEN
    RAISE EXCEPTION 'email_required';
  END IF;

  INSERT INTO public.alpha_waitlist (
    email,
    display_name,
    platform,
    games_played,
    tcg_experience,
    interest,
    discord_username
  ) VALUES (
    normalized_email,
    nullif(trim(p_display_name), ''),
    nullif(trim(p_platform), ''),
    nullif(trim(p_games_played), ''),
    nullif(trim(p_tcg_experience), ''),
    nullif(trim(p_interest), ''),
    nullif(trim(p_discord_username), '')
  )
  ON CONFLICT (email) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    platform = EXCLUDED.platform,
    games_played = EXCLUDED.games_played,
    tcg_experience = EXCLUDED.tcg_experience,
    interest = EXCLUDED.interest,
    discord_username = EXCLUDED.discord_username,
    updated_at = now();
END;
$$;

REVOKE ALL ON FUNCTION public.save_alpha_waitlist_profile(text, text, text, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.save_alpha_waitlist_profile(text, text, text, text, text, text, text) TO anon, authenticated;
