import Stripe from 'stripe';
import { supabase } from '../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, displayName, message, isAnonymous } = req.body;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        week_number: getCurrentWeekNumber(),
        display_name: isAnonymous ? 'Anonymous' : displayName,
      }
    });

    // Store donation in Supabase
    const { error } = await supabase
      .from('donations')
      .insert([{
        amount,
        displayName,
        message,
        is_anonymous: isAnonymous,
        payment_intent: paymentIntent.id,
        week_number: getCurrentWeekNumber(), // You'll need to implement this
      }]);

    if (error) throw error;

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
} 