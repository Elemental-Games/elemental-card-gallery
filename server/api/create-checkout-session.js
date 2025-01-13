import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, email, displayName, isAnonymous, subscribeToUpdates } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Donation to Elemental Masters',
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      metadata: {
        displayName,
        isAnonymous,
        subscribeToUpdates,
      },
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_URL}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/donate`,
    });

    // Store donation in Supabase
    const { error } = await supabase.from('donations').insert([{
      amount,
      display_name: displayName,
      is_anonymous: isAnonymous,
      email,
      payment_status: 'pending',
      payment_intent: session.payment_intent,
      subscribe_to_updates: subscribeToUpdates
    }]);

    if (error) throw error;

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Checkout session error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 