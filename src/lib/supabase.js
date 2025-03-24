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