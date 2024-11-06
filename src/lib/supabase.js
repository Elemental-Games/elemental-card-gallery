// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function subscribeEmail(email) {
  try {
    // Check for existing subscription
    const { data: existingUser, error: searchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email.toLowerCase().trim());

    if (searchError) {
      console.error('Search error:', searchError);
      throw new Error('Failed to check subscription status');
    }

    // If user exists
    if (existingUser && existingUser.length > 0) {
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
      }]);

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('Failed to create subscription');
    }

    return {
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    };

  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: error.message || 'Failed to subscribe. Please try again later.'
    };
  }
}

// Function to get all subscribers
export async function getSubscribers() {
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export { supabase };