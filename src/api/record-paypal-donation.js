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

  const now = new Date();
  
  try {
    // Store donation record
    const { error: donationError } = await supabase.from('donations').insert([{
      amount,
      display_name: displayName,
      is_anonymous: isAnonymous,
      email: paypalEmail,
      payment_status: 'completed',
      payment_provider: 'paypal',
      payment_id: orderId,
      subscribe_to_updates: subscribeToUpdates,
      created_at: now.toISOString(),
      week_number: getWeekNumber(now)
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
          subscribed_at: now.toISOString(),
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

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
} 