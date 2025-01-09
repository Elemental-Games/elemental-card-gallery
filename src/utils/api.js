import { supabase } from '../lib/supabase';
import { sendWelcomeEmail } from '../lib/email-service';

export const subscribeEmail = async (email) => {
  try {
    const cleanEmail = email.toLowerCase().trim();
    console.log('Starting subscription process for:', cleanEmail);

    // Check if email already exists
    const { count, error: countError } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('email', cleanEmail);

    if (countError) {
      console.error('Error checking subscriber count:', countError);
      throw countError;
    }

    if (count > 0) {
      return {
        success: false,
        message: 'This email is already subscribed!'
      };
    }

    // Generate a unique unsubscribe token
    const unsubscribeToken = crypto.randomUUID();

    // Insert new subscriber with all columns
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{
        email: cleanEmail,
        status: 'active',
        subscribed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        unsubscribe_token: unsubscribeToken
      }]);

    if (insertError) {
      console.error('Error inserting subscriber:', insertError);
      throw insertError;
    }

    // Send welcome email
    const emailResult = await sendWelcomeEmail(cleanEmail);
    console.log('Welcome email result:', emailResult);

    return {
      success: true,
      message: emailResult.success 
        ? 'Successfully subscribed! Please check your email for a welcome message.'
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
