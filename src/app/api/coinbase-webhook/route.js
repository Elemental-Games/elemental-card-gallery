import { NextResponse } from 'next/server';
import { recordCoinbaseDonation } from '@/api/record-coinbase-donation';
import { Client, Webhook } from 'coinbase-commerce-node';

Client.init(process.env.COINBASE_COMMERCE_API_KEY);

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-cc-webhook-signature');
    
    const event = Webhook.verifyEventBody(
      rawBody,
      signature,
      process.env.COINBASE_WEBHOOK_SECRET
    );

    if (event.type === 'charge:confirmed') {
      const { metadata, payments } = event.data;
      const payment = payments[0];

      await recordCoinbaseDonation({
        chargeId: event.data.id,
        amount: Number(event.data.pricing.local.amount),
        displayName: metadata.displayName,
        isAnonymous: metadata.isAnonymous === 'true',
        subscribeToUpdates: metadata.subscribeToUpdates === 'true',
        cryptoEmail: payment.email
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 