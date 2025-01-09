import { supabase } from '../lib/supabase';
import { sendWelcomeEmail } from '../lib/email-service';

export const subscribeEmail = async (email) => {
  try {
    console.log('Starting subscription process for:', email);

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing subscriber:', checkError);
      throw checkError;
    }

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

    if (insertError) {
      console.error('Error inserting subscriber:', insertError);
      throw insertError;
    }

    // Send welcome email
    const emailResult = await sendWelcomeEmail(email);
    console.log('Welcome email result:', emailResult);

    return {
      success: true,
      message: emailResult.success 
        ? 'Successfully subscribed! Check your email for a welcome message.'
        : 'Successfully subscribed! Welcome email will be sent shortly.'
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    };
  }
};
