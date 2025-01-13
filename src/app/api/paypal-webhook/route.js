import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  try {
    const body = await req.text();
    const headersList = headers();
    const webhookEvent = JSON.parse(body);

    console.log('📦 Received PayPal webhook:', webhookEvent.event_type);

    // Handle payment completion
    if (webhookEvent.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const payment = webhookEvent.resource;
      
      // Update donation status
      const { error: updateError } = await supabase
        .from('donations')
        .update({ payment_status: 'completed' })
        .eq('payment_id', payment.id);

      if (updateError) {
        console.error('❌ Error updating donation:', updateError);
        throw updateError;
      }

      console.log('✅ Successfully processed PayPal payment:', payment.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
} 