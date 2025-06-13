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
      subject: 'Welcome to Elekin TCG - Thanks for subscribing!',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1A103C; color: #fff; padding: 30px; border-radius: 15px; border: 2px solid #fcd34d;">
          
          <!-- WELCOME HEADER -->
          <div style="text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #9333ea, #fcd34d); padding: 20px; border-radius: 10px;">
            <h1 style="margin: 0; color: #1A103C; font-size: 28px; font-weight: bold;">🎉 Welcome to Elekin TCG 🎉</h1>
            <p style="margin: 10px 0 0 0; color: #1A103C; font-size: 18px;">Thanks for subscribing to our updates</p>
          </div>

          <!-- THANK YOU MESSAGE -->
          <div style="background-color: rgba(147, 51, 234, 0.1); border-left: 4px solid #9333ea; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
            <h2 style="color: #fcd34d; margin-top: 0; font-size: 22px;">Thanks for joining us!</h2>
            <p style="color: #ffffff; font-size: 16px; line-height: 1.6; margin: 15px 0;">
              We're excited to have you as part of the Elekin community. You'll be among the first to know about card reveals, 
              game updates, and our official launch date.
            </p>
          </div>

          <!-- DISCORD INVITATION -->
          <div style="background-color: rgba(252, 211, 77, 0.1); border: 2px solid #fcd34d; padding: 25px; margin-bottom: 25px; border-radius: 10px; text-align: center;">
            <h3 style="color: #fcd34d; margin-top: 0; font-size: 20px;">Join Our Discord Community</h3>
            <p style="color: #ffffff; font-size: 16px; margin-bottom: 20px;">
              Connect with other players, get exclusive updates, and claim your early supporter role.
            </p>
            
            <div style="margin: 25px 0;">
              <a href="https://discord.gg/PVrgZBmcMq" style="display: inline-block; background: #5865F2; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Click Here to Join Discord
              </a>
            </div>
            
            <p style="color: #fcd34d; font-size: 14px;">
              ⏰ Claim your early supporter role within 24 hours of subscribing
            </p>
          </div>

          <!-- WHAT TO EXPECT -->
          <div style="background-color: rgba(252, 211, 77, 0.05); padding: 20px; margin-bottom: 25px; border-radius: 10px;">
            <h3 style="color: #fcd34d; margin-top: 0; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">📅 What to Expect:</h3>
            <div style="color: #ffffff; font-size: 15px; line-height: 1.6;">
              <p style="margin: 10px 0;"><strong style="color: #fcd34d;">Weekly card reveals:</strong> New cards unveiled every Monday starting June 23rd</p>
              <p style="margin: 10px 0;"><strong style="color: #fcd34d;">Game updates:</strong> Development progress and behind-the-scenes content</p>
              <p style="margin: 10px 0;"><strong style="color: #fcd34d;">Community events:</strong> Discord activities, giveaways, and discussions</p>
              <p style="margin: 10px 0;"><strong style="color: #fcd34d;">Launch announcement:</strong> Official launch date revealed on August 4th, 2025</p>
            </div>
          </div>

          <!-- LAUNCH DATE INFO -->
          <div style="background-color: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; padding: 20px; margin-bottom: 25px; border-radius: 10px; text-align: center;">
            <h3 style="color: #22c55e; margin-top: 0; font-size: 18px;">Launch Date Reveal</h3>
            <p style="color: #ffffff; font-size: 16px; margin: 10px 0;">Mark your calendar:</p>
            <p style="color: #fcd34d; font-size: 24px; font-weight: bold; margin: 15px 0;">August 4th, 2025</p>
            <p style="color: #ffffff; font-size: 14px;">We'll announce the official launch date and share exciting news about the game!</p>
          </div>

          <!-- PERSONAL NOTE -->
          <div style="border-top: 2px solid #374151; padding-top: 20px; margin-bottom: 25px;">
            <p style="color: #ffffff; font-size: 16px; line-height: 1.6;">
              Thanks again for your interest in Elekin TCG. We're working hard to create an amazing 
              trading card game experience, and we can't wait to share it with you.
            </p>
            <p style="color: #fcd34d; margin-top: 15px; font-weight: bold;">
              - Mark Diorio, Founder of Elemental Games
            </p>
          </div>

          <!-- SOCIAL LINKS -->
          <div style="margin-bottom: 30px; text-align: center;">
            <p style="margin-bottom: 15px; color: #ffffff;">Follow us on social media:</p>
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
            <p>You're receiving this email because you subscribed to updates for Elekin: Masters of Kinbrold.</p>
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
