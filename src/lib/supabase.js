// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from './email-service';

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
  try {
    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (existingUser) {
      return {
        success: false,
        message: 'You are already subscribed!'
      };
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{
        email: email.toLowerCase().trim(),
        status: 'active',
        subscribed_at: new Date().toISOString()
      }]);

    if (insertError) throw insertError;

    // Send welcome email
    await sendWelcomeEmail(email);

    return {
      success: true,
      message: 'Successfully subscribed! Check your email for a welcome message.'
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    };
  }
}