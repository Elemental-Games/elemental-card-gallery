import { supabase } from '@/lib/supabase';

export async function recordCoinbaseDonation(donationData) {
  const { 
    chargeId, 
    amount, 
    displayName, 
    isAnonymous, 
    subscribeToUpdates, 
    cryptoEmail 
  } = donationData;

  const now = new Date();
  
  try {
    // Store donation record
    const { error: donationError } = await supabase.from('donations').insert([{
      amount,
      display_name: displayName,
      is_anonymous: isAnonymous,
      email: cryptoEmail,
      status: 'completed',
      provider: 'coinbase',
      order_id: chargeId,
      subscribe_updates: subscribeToUpdates,
      created_at: now.toISOString(),
      week_number: getWeekNumber(now)
    }]);

    if (donationError) {
      console.error('Donation Error:', donationError);
      throw donationError;
    }

    // Handle newsletter subscription
    if (subscribeToUpdates && cryptoEmail) {
      const { count } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('email', cryptoEmail);

      if (count === 0) {
        await supabase.from('subscribers').insert([{
          email: cryptoEmail,
          status: 'active',
          subscribed_at: now.toISOString(),
          source: 'donation_crypto'
        }]);
      }
    }

    return { success: true };
  } catch (err) {
    console.error('❌ Error:', err);
    throw new Error('Failed to record crypto donation');
  }
} 