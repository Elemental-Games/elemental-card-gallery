// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from './email-service';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function subscribeEmail(email) {
  try {
    console.log('Starting subscription process for:', email);

    // Check for existing subscription
    const { data: existingUser, error: searchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (searchError && searchError.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Search error:', searchError);
      throw new Error('Failed to check subscription status');
    }

    // If user exists and is active
    if (existingUser?.status === 'active') {
      return {
        success: true,
        message: 'Thank you for your enthusiasm! You\'re already subscribed to our newsletter.'
      };
    }

    // If user exists but is unsubscribed, reactivate them
    if (existingUser?.status === 'unsubscribed') {
      const { error: updateError } = await supabase
        .from('subscribers')
        .update({
          status: 'active',
          subscribed_at: new Date().toISOString(),
          unsubscribe_token: crypto.randomUUID()
        })
        .eq('email', email.toLowerCase().trim());

      if (updateError) {
        console.error('Reactivation error:', updateError);
        throw new Error('Failed to reactivate subscription');
      }

      // Send welcome back email
      await sendWelcomeEmail(email, existingUser.unsubscribe_token);

      return {
        success: true,
        message: 'Welcome back! Your subscription has been reactivated.'
      };
    }

    // Create new subscriber
    const unsubscribeToken = crypto.randomUUID();
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{
        email: email.toLowerCase().trim(),
        status: 'active',
        subscribed_at: new Date().toISOString(),
        unsubscribe_token: unsubscribeToken
      }]);

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Failed to create subscription');
    }

    // Send welcome email
    await sendWelcomeEmail(email, unsubscribeToken);

    return {
      success: true,
      message: 'Successfully subscribed! Check your email for a welcome message.'
    };

  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: error.message || 'Failed to subscribe. Please try again later.'
    };
  }
}

export async function unsubscribeEmail(token) {
  try {
    const { error } = await supabase
      .from('subscribers')
      .update({ 
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('unsubscribe_token', token);

    if (error) throw error;

    return {
      success: true,
      message: 'Successfully unsubscribed from our newsletter.'
    };
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return {
      success: false,
      message: 'Failed to unsubscribe. Please try again later.'
    };
  }
}

export { supabase };