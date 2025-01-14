import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      orderId, 
      amount, 
      displayName, 
      isAnonymous, 
      subscribeToUpdates, 
      paypalEmail 
    } = body;

    // Store donation record
    const { error: donationError } = await supabase.from('donations').insert([{
      amount,
      display_name: displayName,
      is_anonymous: isAnonymous,
      email: paypalEmail,
      payment_status: 'completed',
      payment_provider: 'paypal',
      payment_id: orderId,
      subscribe_to_updates: subscribeToUpdates
    }]);

    if (donationError) {
      console.error('❌ Error storing donation:', donationError);
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    );
  }
} 