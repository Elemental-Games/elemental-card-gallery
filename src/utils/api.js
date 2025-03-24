import { subscribeEmail as supabaseSubscribeEmail } from '../lib/supabase';
import { supabase } from '../lib/supabase';

export const triggerWelcomeEmail = async (email) => {
  try {
    const { error } = await supabase.functions.invoke('send-welcome-email', {
      body: { email }
    });

    if (error) {
      console.error('Error triggering welcome email:', error);
      return { success: false, message: error.message };
    }

    return { success: true, message: 'Welcome email sent successfully' };
  } catch (err) {
    console.error('Exception triggering welcome email:', err);
    return { success: false, message: 'Unable to send welcome email' };
  }
};

export const subscribeEmail = async (email) => {
  try {
    // Use the improved subscribeEmail function from supabase.js
    const result = await supabaseSubscribeEmail(email);
    
    // If subscription was successful, attempt to trigger welcome email via edge function
    if (result.success) {
      await triggerWelcomeEmail(email);
    }
    
    return result;
  } catch (error) {
    console.error('API subscription error:', error);
    return {
      success: false,
      message: error.message || 'Failed to subscribe. Please try again later.'
    };
  }
};
