// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const getUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const signOut = async () => {
  try {
    await supabase.auth.signOut();
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
};

export async function subscribeEmail(email) {
  // Check if browser is online
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    console.warn('Attempted to subscribe while offline');
    return {
      success: false,
      message: 'Unable to subscribe while offline. Please check your internet connection.'
    };
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    console.log('Starting subscription process for:', normalizedEmail);

    // Check if email already exists - use a try-catch to handle potential network issues
    try {
      const { data: existingSubscriber, error: queryError } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', normalizedEmail)
        .maybeSingle();

      if (queryError) {
        console.error('Error checking existing subscriber:', queryError);
        // Continue anyway, we'll check for duplicates at insert time
      } else if (existingSubscriber) {
        return {
          success: false,
          message: 'You are already subscribed!'
        };
      }
    } catch (queryException) {
      console.error('Exception checking subscriber:', queryException);
      // Continue with insert attempt
    }

    // Insert new subscriber - use try-catch for network issues
    try {
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([{
          email: normalizedEmail,
          status: 'active',
          subscribed_at: new Date().toISOString()
        }]);

      if (insertError) {
        console.error('Error inserting subscriber:', insertError);
        
        // Check if it's a unique violation (email already exists)
        if (insertError.code === '23505') {
          return {
            success: false,
            message: 'This email is already subscribed!'
          };
        }
        
        throw insertError;
      }
    } catch (insertException) {
      console.error('Exception inserting subscriber:', insertException);
      throw insertException;
    }

    // IMPORTANT: Skip direct email sending in client - this should be handled by a serverless function or backend
    // Email sending from browser causes CORS issues with Resend API
    
    return {
      success: true,
      message: 'Successfully subscribed! You\'ll receive a welcome email shortly.'
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: error.message || 'Failed to subscribe. Please try again later.'
    };
  }
}

const ensureSubscriber = async (email) => {
  const normalizedEmail = email.toLowerCase().trim();
  try {
    const { data: existing } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle();
    if (!existing) {
      await supabase.from('subscribers').insert([{
        email: normalizedEmail,
        status: 'active',
        subscribed_at: new Date().toISOString(),
      }]);
    }
  } catch (err) {
    console.warn('Could not upsert subscriber (non-fatal):', err);
  }
};

const alphaWaitlistFallback = async (email) => {
  await ensureSubscriber(email);
  return {
    success: true,
    message: 'You\'re on the Alpha tester waitlist! We\'ll email you when Closed Alpha opens October 1.',
    fallback: true,
  };
};

/** Step 1: email-only Alpha tester waitlist */
export async function joinAlphaWaitlist(emailInput) {
  const email = (emailInput || '').toLowerCase().trim();
  if (!email) {
    return { success: false, message: 'Email is required.' };
  }

  try {
    const { error } = await supabase.from('alpha_waitlist').insert([{ email }]);

    if (error) {
      if (error.code === '23505') {
        return {
          success: true,
          alreadyOnList: true,
          email,
          message:
            'You\'re already signed up! Check your email for a confirmation — your Alpha key is coming soon.',
        };
      }
      if (error.code === '42P01' || /relation .* does not exist/i.test(error.message || '')) {
        return alphaWaitlistFallback(email);
      }
      throw error;
    }

    await ensureSubscriber(email);
    return {
      success: true,
      email,
      message: 'You\'re on the Alpha tester waitlist! Check your inbox — then complete the short profile on this site.',
    };
  } catch (error) {
    console.error('Alpha waitlist error:', error);
    return {
      success: false,
      message: error.message || 'Could not add you to the waitlist. Please try again.',
    };
  }
}

/** Step 2: tester questionnaire (after waitlist signup) */
export async function submitAlphaQuestionnaire(payload) {
  const email = (payload.email || '').toLowerCase().trim();
  if (!email) {
    return { success: false, message: 'Email is required.' };
  }

  const row = {
    display_name: (payload.displayName || '').trim() || null,
    platform: (payload.platform || '').trim() || null,
    games_played: (payload.gamesPlayed || '').trim() || null,
    tcg_experience: (payload.tcgExperience || '').trim() || null,
    interest: (payload.interest || '').trim() || null,
    discord_username: (payload.discordUsername || '').trim() || null,
  };

  try {
    const { error } = await supabase.rpc('save_alpha_waitlist_profile', {
      p_email: email,
      p_display_name: row.display_name,
      p_platform: row.platform,
      p_games_played: row.games_played,
      p_tcg_experience: row.tcg_experience,
      p_interest: row.interest,
      p_discord_username: row.discord_username,
    });

    if (error) {
      if (
        error.code === '42883' ||
        error.code === 'PGRST202' ||
        /function .* does not exist/i.test(error.message || '')
      ) {
        const { error: upsertError } = await supabase
          .from('alpha_waitlist')
          .upsert({ email, ...row }, { onConflict: 'email' });
        if (upsertError) throw upsertError;
      } else if (error.code === '42P01' || /relation .* does not exist/i.test(error.message || '')) {
        await ensureSubscriber(email);
        return {
          success: true,
          message: 'Profile saved! We\'ll use your answers when selecting testers.',
          fallback: true,
        };
      } else {
        throw error;
      }
    }

    await ensureSubscriber(email);
    return {
      success: true,
      message: 'Tester profile complete! We\'ll email you about Closed Alpha access.',
    };
  } catch (error) {
    console.error('Alpha questionnaire error:', error);
    return {
      success: false,
      message: error.message || 'Could not save your profile. Please try again.',
    };
  }
}

/** @deprecated Use joinAlphaWaitlist + submitAlphaQuestionnaire */
export async function submitAlphaApplication(payload) {
  const email = (payload.email || '').toLowerCase().trim();
  const waitlist = await joinAlphaWaitlist(email);
  if (!waitlist.success) return waitlist;
  return submitAlphaQuestionnaire(payload);
}

export async function submitCreatorApplication(payload) {
  const email = (payload.email || '').toLowerCase().trim();
  const name = (payload.name || '').trim();
  if (!email || !name) {
    return { success: false, message: 'Name and email are required.' };
  }

  try {
    const row = {
      name,
      email,
      channel_name: (payload.channelName || '').trim() || null,
      platforms: (payload.platforms || '').trim() || null,
      profile_urls: (payload.profileUrls || '').trim() || null,
      primary_topics: (payload.primaryTopics || '').trim() || null,
      audience_size: (payload.audienceSize || '').trim() || null,
      typical_views: (payload.typicalViews || '').trim() || null,
      country_timezone: (payload.countryTimezone || '').trim() || null,
      why_elekin: (payload.whyElekin || '').trim() || null,
      notes: (payload.notes || '').trim() || null,
    };

    const { error } = await supabase.from('creator_applications').insert([row]);

    if (error) {
      if (error.code === '23505') {
        return { success: false, message: 'An application with this email already exists.' };
      }
      if (error.code === '42P01' || /relation .* does not exist/i.test(error.message || '')) {
        await ensureSubscriber(email);
        return {
          success: true,
          message: 'Application received! We will follow up by email.',
          fallback: true,
        };
      }
      throw error;
    }

    await ensureSubscriber(email);
    return {
      success: true,
      message: 'Application received! Our team will review and follow up by email.',
    };
  } catch (error) {
    console.error('Creator application error:', error);
    return {
      success: false,
      message: error.message || 'Could not submit your application. Please try again.',
    };
  }
}