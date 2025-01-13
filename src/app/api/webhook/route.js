import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';
import { sendDonationEmail } from '@/lib/emailService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_DONATION_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle successful checkout completion
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Update donation status in database
      const { error: updateError } = await supabase
        .from('donations')
        .update({ payment_status: 'completed' })
        .eq('payment_intent', session.payment_intent);

      if (updateError) throw updateError;

      // Get the donation details
      const { data: donation, error: fetchError } = await supabase
        .from('donations')
        .select('*')
        .eq('payment_intent', session.payment_intent)
        .single();

      if (fetchError) throw fetchError;

      // Send thank you email
      await sendDonationEmail(donation);

      // Handle newsletter subscription if opted in
      if (donation.subscribe_to_updates) {
        // Add to your newsletter service
        // Example: await subscribeToNewsletter(donation.email);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 