import { supabase } from '@/lib/supabase';

export async function recordDonation(donationData) {
  const { 
    orderId, 
    amount, 
    displayName, 
    isAnonymous, 
    subscribeToUpdates, 
    paypalEmail 
  } = donationData;

  try {
    // Store donation record
    const { error: donationError } = await supabase.from('donations').insert([{
      amount,
      display_name: displayName,
      is_anonymous: isAnonymous,
      email: paypalEmail,
      payment_status: 'completed',
      payment_provider: 'paypal',
      paypal_order_id: orderId,
      subscribe_to_updates: subscribeToUpdates,
      created_at: new Date().toISOString()
    }]);

    if (donationError) {
      console.error('Donation Error:', donationError);
      throw donationError;
    }

    // Handle newsletter subscription
    if (subscribeToUpdates) {
      const { count } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('email', paypalEmail);

      if (count === 0) {
        await supabase.from('subscribers').insert([{
          email: paypalEmail,
          status: 'active',
          subscribed_at: new Date().toISOString(),
          source: 'donation'
        }]);
      }
    }

    return { success: true };
  } catch (err) {
    console.error('❌ Error:', err);
    throw new Error('Failed to record donation');
  }
} 