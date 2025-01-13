import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_DONATION_WEBHOOK_SECRET;

// Add export config to disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Add support for OPTIONS method
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, stripe-signature',
    },
  });
}

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle successful checkout completion
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      console.log('Processing completed checkout session:', session.id);

      // Update donation status in database
      const { error: updateError } = await supabase
        .from('donations')
        .update({ payment_status: 'completed' })
        .eq('payment_intent', session.payment_intent);

      if (updateError) {
        console.error('Error updating donation status:', updateError);
        throw updateError;
      }

      // Get the donation details
      const { data: donation, error: fetchError } = await supabase
        .from('donations')
        .select('*')
        .eq('payment_intent', session.payment_intent)
        .single();

      if (fetchError) {
        console.error('Error fetching donation details:', fetchError);
        throw fetchError;
      }

      console.log('Successfully processed donation:', donation.id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: err.message },
      { status: 500 }
    );
  }
} 