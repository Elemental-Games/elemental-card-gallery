import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const customizeStripeReceipt = async () => {
  try {
    const configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: "Thank you for supporting Elemental Masters!",
        privacy_policy_url: "https://elementalmasters.com/privacy",
        terms_of_service_url: "https://elementalmasters.com/terms",
      },
      features: {
        customer_update: {
          allowed_updates: ['email'],
          enabled: true,
        },
        invoice_history: {
          enabled: true,
        },
      },
    });

    // Customize email settings
    await stripe.accounts.update({
      settings: {
        branding: {
          primary_color: '#fcd34d', // yellow-400
          secondary_color: '#581c87', // purple-900
          logo: 'https://elementalmasters.com/logo.png', // Update with your logo URL
        },
        payments: {
          statement_descriptor: 'ELEMENTAL MASTERS',
          statement_descriptor_suffix: 'DONATION',
        },
      },
    });

  } catch (error) {
    console.error('Error customizing Stripe:', error);
  }
}; 