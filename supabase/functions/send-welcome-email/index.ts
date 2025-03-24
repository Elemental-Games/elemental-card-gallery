import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0';
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
serve(async (req)=>{
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
  };
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    const { email } = await req.json();
    const { data, error } = await resend.emails.send({
      from: 'Elemental Games <noreply@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Games!',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1A103C; color: #fff; padding: 30px; border-radius: 15px; border: 2px solid #fcd34d;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; color: #fcd34d; font-size: 32px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0px 2px 4px rgba(0,0,0,0.5);">Welcome to Elekin TCG</h1>
          </div>

          <div style="font-size: 18px; line-height: 1.6; margin-bottom: 30px; text-align: center;">
            <p>Thank you for signing up!</p>
            <p>We're excited to have you join our community of card game enthusiasts.</p>
          </div>

          <div style="background-color: rgba(252, 211, 77, 0.1); border-left: 4px solid #fcd34d; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
            <h3 style="color: #fcd34d; margin-top: 0;">As a subscriber, you'll enjoy:</h3>
            <ul style="padding-left: 20px; color: #e2e8f0;">
              <li style="margin-bottom: 10px;">Exclusive card reveals before anyone else</li>
              <li style="margin-bottom: 10px;">Early access to pre-order opportunities</li>
              <li style="margin-bottom: 10px;">Special promotions only for our subscribers</li>
              <li style="margin-bottom: 10px;">Early access to new game features and updates</li>
              <li style="margin-bottom: 10px;">Very Super Early access to new game features and updates</li>
            </ul>
          </div>

          <div style="margin-bottom: 30px;">
            <a href="https://elementalgames.gg/login?mode=signup" style="display: block; background-color: #fcd34d; color: #1A103C; text-align: center; padding: 16px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; font-size: 18px; letter-spacing: 1px;">
              CREATE YOUR ACCOUNT
            </a>
          </div>

          <div style="margin-bottom: 30px; text-align: center;">
            <p style="margin-bottom: 15px; color: #e2e8f0;">Connect with us:</p>
            <div style="display: flex; justify-content: center; gap: 20px;">
              <a href="https://discord.gg/elemental-games" style="color: #e2e8f0; text-decoration: none;">Discord</a>
              <a href="https://twitter.com/elementalgames" style="color: #e2e8f0; text-decoration: none;">Twitter</a>
              <a href="https://instagram.com/elementalgames" style="color: #e2e8f0; text-decoration: none;">Instagram</a>
            </div>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; color: #9ca3af; font-size: 12px;">
            <p>⚡ Launching in <strong>June 2025</strong>! ⚡</p>
            <p>Elemental Games LLC © 2025. All rights reserved.</p>
            <p>You're receiving this email because you signed up for updates about Elekin: Masters of Kinbrold.</p>
            <p><a href="https://elementalgames.gg/unsubscribe?email=${email}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a></p>
          </div>
        </div>
      `
    });
    if (error) {
      throw error;
    }
    return new Response(JSON.stringify({
      success: true
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
});
