import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'API is working!' });
}

export async function POST(req) {
  const body = await req.json();
  return NextResponse.json({ 
    message: 'POST received!',
    receivedData: body 
  });
} 