import { NextResponse } from 'next/server';
import { validatePayPalTransaction } from '@/components/PayPal/utils';

export async function POST(req) {
  try {
    const { orderID } = await req.json();
    
    // Verify the payment with PayPal
    const response = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderID}`, {
      headers: {
        'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const order = await response.json();
    validatePayPalTransaction(order);

    return NextResponse.json({ verified: true });
  } catch (err) {
    console.error('❌ Payment verification error:', err);
    return NextResponse.json(
      { error: 'Payment verification failed', details: err.message },
      { status: 400 }
    );
  }
} 