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

    // Calculate days until launch (June 1, 2025)
    const today = new Date();
    const launchDate = new Date('2025-06-01');
    const timeDiff = launchDate.getTime() - today.getTime();
    const daysUntilLaunch = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Fetch current subscriber count to show correct position
    const subscriberCountResponse = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/rest/v1/subscribers?select=count&count=exact`,
      {
        method: 'HEAD',
        headers: {
          'Content-Type': 'application/json',
          'apikey': Deno.env.get('SUPABASE_ANON_KEY') || '',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY') || ''}`
        }
      }
    );
    
    const subscriberCount = parseInt(subscriberCountResponse.headers.get('content-range')?.split('/')[1] || '0');
    const userPosition = subscriberCount; // This user's position in the list
    
    // Generate a unique unsubscribe token using a timestamp and random string
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 15);
    const unsubscribeToken = `${timestamp}-${randomString}`;
    
    // Update the subscriber record with the unsubscribe token
    const { error: updateError } = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/rest/v1/subscribers?email=eq.${encodeURIComponent(email)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': Deno.env.get('SUPABASE_ANON_KEY') || '',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY') || ''}`
        },
        body: JSON.stringify({
          unsubscribe_token: unsubscribeToken
        })
      }
    ).then(response => response.json());

    if (updateError) {
      console.error('Error updating subscriber:', updateError);
    }

    const { data, error } = await resend.emails.send({
      from: 'Elemental Games <noreply@elementalgames.gg>',
      to: email,
      subject: '🔥 Your Early Access Elemental Status is CONFIRMED! Next step inside...',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1A103C; color: #fff; padding: 30px; border-radius: 15px; border: 2px solid #fcd34d;">
          
          <!-- CELEBRATION HEADER -->
          <div style="text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #9333ea, #fcd34d); padding: 20px; border-radius: 10px;">
            <h1 style="margin: 0; color: #1A103C; font-size: 28px; font-weight: bold;">🎉 WELCOME TO THE KINBROLD! 🎉</h1>
            <p style="margin: 10px 0 0 0; color: #1A103C; font-size: 18px; font-weight: bold;">You're now an Early Access Elemental!</p>
          </div>

          <!-- STATUS CONFIRMATION -->
          <div style="background-color: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; padding: 20px; margin-bottom: 25px; border-radius: 10px; text-align: center;">
            <h2 style="color: #22c55e; margin-top: 0; font-size: 24px;">✅ EXCLUSIVE STATUS CONFIRMED</h2>
            <p style="color: #fcd34d; font-size: 18px; font-weight: bold; margin: 15px 0;">You're officially one of the first 500 Early Access Elementals!</p>
            <p style="color: #e2e8f0; font-size: 16px; margin: 10px 0;">This exclusive status can never be earned again after launch.</p>
          </div>

          <!-- URGENT DISCORD CTA -->
          <div style="background-color: rgba(252, 211, 77, 0.1); border: 2px solid #fcd34d; padding: 25px; margin-bottom: 25px; border-radius: 10px; text-align: center;">
            <h3 style="color: #fcd34d; margin-top: 0; font-size: 22px;">🚨 IMMEDIATE ACTION REQUIRED 🚨</h3>
            <p style="color: #ffffff; font-size: 16px; margin-bottom: 20px;">Claim your exclusive <strong>Early Access, OG, Discord role</strong> while you can!</p>
            
            <div style="margin: 25px 0;">
              <a href="https://discord.gg/PVrgZBmcMq" style="display: inline-block; background: #6B21A8; color: white; text-decoration: none; padding: 18px 35px; border-radius: 10px; font-weight: bold; font-size: 18px; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(107, 33, 168, 0.4);">
                🎮 CLAIM YOUR DISCORD ROLE NOW →
              </a>
            </div>
            
            <p style="color: #fcd34d; font-size: 14px; font-weight: bold;">⏰ Limited time: You have 24 hours to claim your role!!</p>
          </div>

          <!-- EXCLUSIVE BENEFITS PREVIEW -->
          <div style="background-color: rgba(147, 51, 234, 0.1); border-left: 4px solid #9333ea; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
            <h3 style="color: #fcd34d; margin-top: 0;">🎁 Your Early Access Elemental Rewards Include:</h3>
            <ul style="padding-left: 20px; color: #ffffff; margin: 15px 0;">
              <li style="margin-bottom: 8px;"><strong style="color: #22c55e;">Exclusive OG Discord Badge</strong> - Permanent status that new members can't get</li>
              <li style="margin-bottom: 8px;"><strong style="color: #22c55e;">Free Pack Giveaway Eligibility</strong> - Exclusive giveaways for Early Access Elementals only</li>
              <li style="margin-bottom: 8px;"><strong style="color: #22c55e;">Launch Date Priority Access</strong> - First to know launch date & Early Bird pricing</li>
              <li style="margin-bottom: 8px;"><strong style="color: #22c55e;">Exclusive Rewards on Launch Day</strong> - Stay tuned for more drops & exclusive bonuses</li>
            </ul>
          </div>

          <!-- COUNTDOWN & TIMELINE -->
          <div style="background-color: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; padding: 20px; margin-bottom: 25px; border-radius: 10px; text-align: center;">
            <h3 style="color: #ef4444; margin-top: 0; font-size: 20px;">⏰ LAUNCH DATE REVEAL COUNTDOWN</h3>
            <p style="color: #ffffff; font-size: 16px; margin: 10px 0;">The launch date will be revealed on:</p>
            <p style="color: #fcd34d; font-size: 24px; font-weight: bold; margin: 15px 0;">July 26th, 2025</p>
            <p style="color: #e2e8f0; font-size: 14px;">Until then, you'll get exclusive content, card reveals, and insider updates!</p>
          </div>

          <!-- WHAT'S NEXT -->
          <div style="background-color: rgba(252, 211, 77, 0.05); padding: 20px; margin-bottom: 25px; border-radius: 10px;">
            <h3 style="color: #fcd34d; margin-top: 0;">📅 What to Expect Next:</h3>
            <div style="color: #e2e8f0; font-size: 15px; line-height: 1.6;">
              <p style="margin: 10px 0;"><strong>This Week:</strong> Join Discord & meet fellow Early Access Elementals</p>
              <p style="margin: 10px 0;"><strong>Weekly:</strong> Exclusive card reveals & strategic insights (Thursdays)</p>
              <p style="margin: 10px 0;"><strong>Build-up:</strong> Daily Discord updates, giveaways, and community events</p>
              <p style="margin: 10px 0;"><strong>July 26th:</strong> Launch date reveal + celebration!</p>
            </div>
          </div>

          <!-- PERSONAL NOTE -->
          <div style="border-top: 2px solid #374151; padding-top: 20px; margin-bottom: 25px;">
            <p style="color: #e2e8f0; font-style: italic; font-size: 16px; line-height: 1.6;">
              "Welcome to the inner elemental circle! As one of our first 500 Elementals, you're not just getting the exclusive rewards – you're becoming part of Elekin's origin story. I can't wait to see you in Discord, on Launch Day, and share this incredible journey with you!"
            </p>
            <p style="color: #fcd34d; margin-top: 15px; font-weight: bold;">
              - Mark Diorio, Founder of Elemental Games
            </p>
          </div>

          <!-- FINAL DISCORD CTA -->
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="https://discord.gg/PVrgZBmcMq" style="display: inline-block; background: linear-gradient(135deg, #9333ea, #fcd34d); color: white; text-decoration: none; padding: 20px 40px; border-radius: 12px; font-weight: bold; font-size: 20px; letter-spacing: 1px; box-shadow: 0 6px 20px rgba(147, 51, 234, 0.4);">
              🚀 JOIN THE DISCORD COMMUNITY →
            </a>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 10px;">Secure your OG status before spots fill up!</p>
          </div>

          <!-- SOCIAL LINKS -->
          <div style="margin-bottom: 30px; text-align: center;">
            <p style="margin-bottom: 15px; color: #e2e8f0;">Stay connected on all platforms:</p>
            <table role="presentation" style="margin: 0 auto; border-collapse: collapse;">
              <tr>
                <td style="padding: 0 15px; text-align: center;">
                  <a href="https://discord.gg/PVrgZBmcMq" style="text-decoration: none; display: inline-block;">
                    <img src="https://i.imgur.com/qp54qEb.png" alt="Discord" width="40" height="40" style="border: 0; display: block; margin: 0 auto;" />
                    <span style="display: block; margin-top: 5px; font-size: 12px; color: #5865F2;">Discord</span>
                  </a>
                </td>
                <td style="padding: 0 15px; text-align: center;">
                  <a href="https://www.tiktok.com/@elekin_tcg" style="text-decoration: none; display: inline-block;">
                    <img src="https://i.imgur.com/6VMIomb.png" alt="TikTok" width="40" height="40" style="border: 0; display: block; margin: 0 auto;" />
                    <span style="display: block; margin-top: 5px; font-size: 12px; color: #FF0050;">TikTok</span>
                  </a>
                </td>
                <td style="padding: 0 15px; text-align: center;">
                  <a href="https://www.instagram.com/elekin_tcg/" style="text-decoration: none; display: inline-block;">
                    <img src="https://i.imgur.com/L81bEOj.png" alt="Instagram" width="40" height="40" style="border: 0; display: block; margin: 0 auto;" />
                    <span style="display: block; margin-top: 5px; font-size: 12px; color: #E1306C;">Instagram</span>
                  </a>
                </td>
              </tr>
            </table>
          </div>

          <!-- FOOTER -->
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; color: #9ca3af; font-size: 12px;">
            <p>Elemental Games LLC © 2025. All rights reserved.</p>
            <p>You're receiving this email because you secured Early Access Elemental status for Elekin: Masters of Kinbrold.</p>
            <p><a href="https://elementalgames.gg/unsubscribe?email=${email}&token=${unsubscribeToken}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a></p>
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
    console.error('Error sending welcome email:', error);
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
