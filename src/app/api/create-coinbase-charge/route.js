import { NextResponse } from 'next/server';
import { Client, resources } from 'coinbase-commerce-node';

const { Charge } = resources;
Client.init(process.env.COINBASE_COMMERCE_API_KEY);

export async function POST(req) {
  try {
    const { metadata } = await req.json();

    const chargeData = {
      name: 'Donation to Elemental Masters',
      description: 'Support the development of Elemental Masters',
      pricing_type: 'no_price',
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate`,
      metadata
    };

    const charge = await Charge.create(chargeData);
    
    return NextResponse.json(charge);
  } catch (error) {
    console.error('Coinbase charge error:', error);
    return NextResponse.json(
      { error: 'Failed to create charge' },
      { status: 500 }
    );
  }
} 