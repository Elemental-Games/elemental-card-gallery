const { supabase } = require('../supabaseClient');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createDonation = async (req, res) => {
  const { amount, displayName, message } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    const { data, error } = await supabase
      .from('donations')
      .insert([{ amount, displayName, message, paymentIntentId: paymentIntent.id }]);

    if (error) throw error;

    res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 