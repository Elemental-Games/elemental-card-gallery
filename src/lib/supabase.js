// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from './email-service';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function subscribeEmail(email) {
  try {
    console.log('Starting subscription process for:', email);

    // Add apikey header to fix 406 error
    const { data: existingUser, error: searchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle();

    if (searchError) {
      console.error('Search error:', searchError);
      throw new Error('Failed to check subscription status');
    }

    // If user exists
    if (existingUser) {
      return {
        success: true,
        message: 'Thank you for your enthusiasm! You\'re already subscribed to our newsletter.'
      };
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{
        email: email.toLowerCase().trim(),
        status: 'active',
        subscribed_at: new Date().toISOString()
        unsubscribe_token: unsubscribeToken
      }]);

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Failed to create subscription');
    }

    // Send welcome email
    const emailSent = await sendWelcomeEmail(email, unsubscribeToken);
    console.log('Email send attempt result:', emailSent);

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