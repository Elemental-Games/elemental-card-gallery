// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from './email-service';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Config:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseKey,
  urlPrefix: supabaseUrl?.substring(0, 10)
});

const supabase = createClient(supabaseUrl, supabaseKey);

export async function subscribeEmail(email) {
  try {
    console.log('Starting subscription process for:', email);

    // Check for existing subscription
    const { data: existingUser, error: searchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email.toLowerCase().trim());

    if (searchError) {
      console.error('Search error:', searchError);
      throw new Error('Failed to check subscription status');
    }

    console.log('Existing user check:', existingUser);

    // If user exists
    if (existingUser && existingUser.length > 0) {
      console.log('User already exists:', existingUser[0]);
      return {
        success: true,
        message: 'Thank you for your enthusiasm! You\'re already subscribed to our newsletter.'
      };
    }

    // Insert new subscriber
    const { data: newSubscriber, error: insertError } = await supabase
      .from('subscribers')
      .insert([
        {
          email: email.toLowerCase().trim(),
          status: 'active',
          subscribed_at: new Date().toISOString()
        }
      ])
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Failed to create subscription');
    }

    console.log('New subscriber inserted:', newSubscriber);

    // Send welcome email
    const emailSent = await sendWelcomeEmail(email);
    console.log('Welcome email status:', emailSent);

    return {
      success: true,
      message: emailSent 
        ? 'Successfully subscribed! Check your email for a welcome message.'
        : 'Successfully subscribed! Welcome email will be sent shortly.'
    };

  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: error.message || 'Failed to subscribe. Please try again later.'
    };
  }
}

export { supabase };