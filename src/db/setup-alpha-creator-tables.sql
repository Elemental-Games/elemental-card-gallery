-- Paste into Supabase Dashboard → SQL Editor, or:
--   supabase db push
-- Same as supabase/migrations/20260922000000_alpha_waitlist_and_creator_applications.sql

-- Alpha tester waitlist + Creator program applications (MMOTCG relaunch)

CREATE TABLE IF NOT EXISTS public.alpha_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  display_name text,
  platform text,
  games_played text,
  tcg_experience text,
  interest text,
  discord_username text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT alpha_waitlist_email_lowercase CHECK (email = lower(trim(email))),
  CONSTRAINT alpha_waitlist_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

CREATE UNIQUE INDEX IF NOT EXISTS alpha_waitlist_email_key ON public.alpha_waitlist (email);

CREATE OR REPLACE FUNCTION public.set_alpha_waitlist_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS alpha_waitlist_set_updated_at ON public.alpha_waitlist;
CREATE TRIGGER alpha_waitlist_set_updated_at
  BEFORE UPDATE ON public.alpha_waitlist
  FOR EACH ROW
  EXECUTE FUNCTION public.set_alpha_waitlist_updated_at();

ALTER TABLE public.alpha_waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS alpha_waitlist_insert_anon ON public.alpha_waitlist;
CREATE POLICY alpha_waitlist_insert_anon
  ON public.alpha_waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS alpha_waitlist_update_anon ON public.alpha_waitlist;
CREATE POLICY alpha_waitlist_update_anon
  ON public.alpha_waitlist FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS alpha_waitlist_select_service ON public.alpha_waitlist;
CREATE POLICY alpha_waitlist_select_service
  ON public.alpha_waitlist FOR SELECT TO service_role USING (true);

CREATE TABLE IF NOT EXISTS public.creator_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  channel_name text,
  platforms text,
  profile_urls text,
  primary_topics text,
  audience_size text,
  typical_views text,
  country_timezone text,
  why_elekin text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT creator_applications_email_lowercase CHECK (email = lower(trim(email))),
  CONSTRAINT creator_applications_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

CREATE UNIQUE INDEX IF NOT EXISTS creator_applications_email_key ON public.creator_applications (email);

ALTER TABLE public.creator_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS creator_applications_insert_anon ON public.creator_applications;
CREATE POLICY creator_applications_insert_anon
  ON public.creator_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS creator_applications_select_service ON public.creator_applications;
CREATE POLICY creator_applications_select_service
  ON public.creator_applications FOR SELECT TO service_role USING (true);
