import { supabase } from '../lib/supabase';

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

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{
        email: cleanEmail,
        status: 'active',
        subscribed_at: new Date().toISOString()
      }]);

    if (insertError) {
      console.error('Error inserting subscriber:', insertError);
      throw insertError;
    }

    // Call our Edge Function to send welcome email
    const { data: emailData, error: emailError } = await supabase.functions.invoke('send-welcome-email', {
      body: { email: cleanEmail }
    });

    if (emailError) {
      console.error('Error sending welcome email:', emailError);
    }

    return {
      success: true,
      message: emailError 
        ? 'Successfully subscribed! Welcome email will be sent shortly.'
        : 'Successfully subscribed! Please check your email for a welcome message.'
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    };
  }
};
