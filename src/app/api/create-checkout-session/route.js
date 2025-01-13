import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Add OPTIONS method for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Add explicit method check
export async function POST(req) {
  console.log('🔍 Received request method:', req.method);
  
  try {
    const body = await req.json();
    console.log('📦 Received request body:', body);
    
    const { amount, email, displayName, isAnonymous, subscribeToUpdates, message } = body;

    console.log('📝 Creating checkout session:', { amount, email, displayName });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Support Elemental Masters',
            description: 'Thank you for your support!',
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      metadata: {
        displayName,
        isAnonymous,
        subscribeToUpdates,
        message
      },
      customer_email: email,
      success_url: `${process.env.SITE_URL}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/donate`,
    });

    console.log('✅ Created checkout session:', session.id);

    // Store initial donation record
    const { error: donationError } = await supabase.from('donations').insert([{
      amount,
      display_name: displayName,
      message,
      is_anonymous: isAnonymous,
      email,
      payment_status: 'pending',
      payment_intent: session.payment_intent,
      subscribe_to_updates: subscribeToUpdates,
      session_id: session.id
    }]);

    if (donationError) {
      console.error('❌ Error storing donation:', donationError);
      throw donationError;
    }

    // If they opted in for updates, add to subscribers table
    if (subscribeToUpdates) {
      const { count } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('email', email);

      if (count === 0) {
        const { error: subscribeError } = await supabase.from('subscribers').insert([{
          email,
          status: 'active',
          subscribed_at: new Date().toISOString(),
          source: 'donation'
        }]);

        if (subscribeError) {
          console.error('❌ Error adding subscriber:', subscribeError);
          // Don't throw error - we don't want to break the donation flow
        }
      }
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('❌ Error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: err.message },
      { status: 500 }
    );
  }
} 