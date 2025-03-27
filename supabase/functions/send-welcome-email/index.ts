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
      subject: '🌊 Welcome to Elekin: Masters of Kinbrold 🍃',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1A103C; color: #fff; padding: 30px; border-radius: 15px; border: 2px solid #fcd34d;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; color: #fcd34d; font-size: 32px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0px 2px 4px rgba(0,0,0,0.5);">WELCOME TO ELEKIN TCG</h1>
          </div>

          <div style="font-size: 18px; line-height: 1.6; margin-bottom: 30px; text-align: center;">
            <p>Thank you for signing up! You've taken your first step into the world of Kinbrold, where the powers of Air, Water, Earth, and Fire set the foundations of this world and all its creatures.</p>
          </div>

          <div style="background-color: rgba(252, 211, 77, 0.1); border-left: 4px solid #fcd34d; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
            <h3 style="color: #fcd34d; margin-top: 0;">As a subscriber, you'll enjoy:</h3>
            <ul style="padding-left: 20px; color: #e2e8f0;">
              <li style="margin-bottom: 10px;"><strong>Exclusive card deep dives</strong> before they go public</li>
              <li style="margin-bottom: 10px;"><strong>Priority access</strong> to beta testing opportunities and pre-orders</li>
              <li style="margin-bottom: 10px;"><strong>Subscriber-only promotions</strong> including beta and limited edition cards</li>
              <li style="margin-bottom: 10px;"><strong>Behind-the-scenes content</strong> on game development and world lore</li>
              <li style="margin-bottom: 10px;"><strong>Early notifications</strong> about our upcoming Kickstarter campaign</li>
            </ul>
          </div>
          
          <div style="background-color: rgba(252, 211, 77, 0.05); padding: 20px; margin-bottom: 30px; border-radius: 4px;">
            <h3 style="color: #fcd34d; margin-top: 0;">What is Elekin?</h3>
            <p style="color: #e2e8f0; line-height: 1.6;">Elekin: Masters of Kinbrold is a tactical TCG where you'll command elemental creatures, collect essence, cast powerful runes, and execute strategic plays to defeat your opponents. With four primary elements and powerful dragon combinations, every game offers unique strategic possibilities.</p>
          </div>
          
          <div style="background-color: rgba(252, 211, 77, 0.05); padding: 20px; margin-bottom: 30px; border-radius: 4px;">
            <h3 style="color: #fcd34d; margin-top: 0;">What's next?</h3>
            <ul style="padding-left: 20px; color: #e2e8f0;">
              <li style="margin-bottom: 10px;">Watch for our weekly card deep dive email every Thursday</li>
              <li style="margin-bottom: 10px;">Join our <a href="https://discord.gg/kkwEwNxA" style="color: #fcd34d; text-decoration: underline;">Discord community</a> to meet fellow players</li>
              <li style="margin-bottom: 10px;">Follow us on <a href="https://x.com/elekinTCG" style="color: #fcd34d; text-decoration: underline;">X</a> for daily updates</li>
            </ul>
            <p style="color: #e2e8f0; margin-top: 15px;">We're thrilled to have you along for our journey, and can't wait to see you in Kinbrold!</p>
          </div>

          <div style="margin-bottom: 30px;">
            <a href="https://elementalgames.gg/cards" style="display: block; background-color: #fcd34d; color: #1A103C; text-align: center; padding: 16px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; font-size: 18px; letter-spacing: 1px;">
              EXPLORE CARD COLLECTION
            </a>
          </div>
          
          <div style="text-align: left; margin-bottom: 30px;">
            <p style="color: #e2e8f0;">Sincerely,</p>
            <p style="color: #e2e8f0; "><strong>Mark Diorio</strong> | Founder of Elemental Games</p>
          </div>

          <div style="margin-bottom: 30px; text-align: center;">
            <p style="margin-bottom: 15px; color: #e2e8f0;">Connect with us:</p>
            <table role="presentation" style="margin: 0 auto; border-collapse: collapse;">
              <tr>
                <td style="padding: 0 15px; text-align: center;">
                  <a href="https://discord.gg/kkwEwNxA" style="text-decoration: none; display: inline-block;">
                    <img src="https://i.imgur.com/qp54qEb.png" alt="Discord" width="40" height="40" style="border: 0; display: block; margin: 0 auto;" />
                    <span style="display: block; margin-top: 5px; font-size: 12px; color: #5865F2;">Discord</span>
                  </a>
                </td>
                <td style="padding: 0 15px; text-align: center;">
                  <a href="https://twitter.com/elekinTCG" style="text-decoration: none; display: inline-block;">
                    <img src="https://i.imgur.com/DK5YxWY.png" alt="Twitter" width="40" height="40" style="border: 0; display: block; margin: 0 auto;" />
                    <span style="display: block; margin-top: 5px; font-size: 12px; color: #1DA1F2;">Twitter</span>
                  </a>
                </td>
                <td style="padding: 0 15px; text-align: center;">
                  <a href="https://instagram.com/elekin_TCG" style="text-decoration: none; display: inline-block;">
                    <img src="https://i.imgur.com/L81bEOj.png" alt="Instagram" width="40" height="40" style="border: 0; display: block; margin: 0 auto;" />
                    <span style="display: block; margin-top: 5px; font-size: 12px; color: #E1306C;">Instagram</span>
                  </a>
                </td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; color: #9ca3af; font-size: 12px;">
            <p>⚡ Launching in <strong>Summer of 2025</strong> ⚡</p>
            <p>Elemental Games LLC © 2025. All rights reserved.</p>
            <p>You're receiving this email because you signed up for updates about Elekin: Masters of Kinbrold.</p>
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
