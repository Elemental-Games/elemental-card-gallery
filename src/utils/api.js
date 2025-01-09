import { supabase } from '../lib/supabase';
import { sendWelcomeEmail } from '../lib/email-service';

export const subscribeEmail = async (email) => {
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
};
