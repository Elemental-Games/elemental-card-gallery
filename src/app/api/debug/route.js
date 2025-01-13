import { NextResponse } from 'next/headers';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const host = headersList.get('host') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    return NextResponse.json({
      status: 'online',
      server: {
        host,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        userAgent
      },
      routes: {
        webhook: '/api/webhook',
        checkout: '/api/create-checkout-session'
      }
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      error: 'Server diagnostic failed',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const headersList = headers();
  
  return NextResponse.json({
    message: 'Debug POST endpoint',
    receivedData: body,
    time: new Date().toISOString(),
    headers: Object.fromEntries(headersList.entries())
  });
} 