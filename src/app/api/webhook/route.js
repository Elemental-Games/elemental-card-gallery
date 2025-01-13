import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';
import { sendDonationEmail } from '@/lib/emailService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_DONATION_WEBHOOK_SECRET;

// Disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    console.log('✅ Webhook verified, processing event:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('💰 Processing checkout session:', session.id);

      // Update donation status
      const { error: updateError } = await supabase
        .from('donations')
        .update({ payment_status: 'completed' })
        .eq('payment_intent', session.payment_intent);

      if (updateError) {
        console.error('❌ Error updating donation:', updateError);
        throw updateError;
      }

      // Get donation details
      const { data: donation, error: fetchError } = await supabase
        .from('donations')
        .select('*')
        .eq('payment_intent', session.payment_intent)
        .single();

      if (fetchError) {
        console.error('❌ Error fetching donation:', fetchError);
        throw fetchError;
      }

      // Send thank you email
      await sendDonationEmail(donation);

      console.log('✅ Successfully processed donation:', donation.id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('❌ Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: err.message },
      { status: 500 }
    );
  }
} 