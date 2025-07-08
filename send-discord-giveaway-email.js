import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function sendDiscordGiveawayEmail() {
  console.log('🎁 Starting Discord Giveaway Email Campaign...');
  
  if (!RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not set in environment variables');
    return;
  }

  try {
    const resend = new Resend(RESEND_API_KEY);

    // Fetch all active subscribers from Supabase
    console.log('📋 Fetching active subscribers...');
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email')
      .eq('status', 'active');

    if (error) {
      console.error('❌ Error fetching subscribers:', error);
      return;
    }

    if (!subscribers || subscribers.length === 0) {
      console.log('📭 No active subscribers found');
      return;
    }

    console.log(`📊 Found ${subscribers.length} active subscribers`);

    // Calculate countdown time to 12:00 PM EST (today)
    const now = new Date();
    const giveawayTime = new Date();
    giveawayTime.setHours(17, 0, 0, 0); // 12:00 PM EST = 17:00 UTC
    
    // If it's already past 12 PM today, set it for tomorrow
    if (now >= giveawayTime) {
      giveawayTime.setDate(giveawayTime.getDate() + 1);
    }

    console.log(`⏰ Giveaway time set for: ${giveawayTime.toLocaleString('en-US', { timeZone: 'America/New_York' })} EST`);

    const discordGiveawayEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎁 First Discord Giveaway - Join Now!</title>
    <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background-color: #1A103C; color: #fff; }
        .countdown-timer { background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
        .social-button { display: inline-block; padding: 12px 25px; margin: 10px; background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
        .discord-button { background: linear-gradient(135deg, #5865f2, #7289da); padding: 15px 30px; margin: 20px 0; border-radius: 10px; font-size: 18px; }
    </style>
    <script>
        function updateCountdown() {
            const giveawayTime = new Date('${giveawayTime.toISOString()}').getTime();
            const now = new Date().getTime();
            const distance = giveawayTime - now;

            if (distance > 0) {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('countdown').innerHTML = 
                    hours.toString().padStart(2, '0') + ':' + 
                    minutes.toString().padStart(2, '0') + ':' + 
                    seconds.toString().padStart(2, '0');
            } else {
                document.getElementById('countdown').innerHTML = "🎁 GIVEAWAY IS LIVE! 🎁";
            }
        }

        setInterval(updateCountdown, 1000);
        window.onload = updateCountdown;
    </script>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 30px 20px; text-align: center; background: linear-gradient(135deg, #1A103C, #2d1b69);">
                    <img src="https://elementalgames.gg/Games_Logo.png" alt="Elemental Games" style="max-width: 200px; margin-bottom: 20px;">
                    <h1 style="margin: 0; color: #fcd34d; font-size: 32px; text-transform: uppercase; letter-spacing: 2px;">🎁 FIRST DISCORD GIVEAWAY! 🎁</h1>
                    <p style="margin: 10px 0 0; color: #e2e8f0; font-size: 18px;">Join our Discord community for your chance to win!</p>
                </td>
            </tr>
        </table>

        <!-- Countdown Timer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 20px;">
                    <div class="countdown-timer">
                        <h2 style="margin: 0 0 15px; color: white; font-size: 24px;">⏰ Giveaway Countdown</h2>
                        <div id="countdown" style="font-size: 36px; font-weight: bold; color: #fcd34d; font-family: 'Courier New', monospace;">
                            Loading...
                        </div>
                        <p style="margin: 15px 0 0; color: white; font-size: 16px;">Until 12:00 PM EST Today!</p>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Main Discord CTA -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 20px; text-align: center;">
                    <h2 style="color: #fcd34d; font-size: 28px; margin-bottom: 20px;">🎮 Join Our Discord Community</h2>
                    <p style="color: #e2e8f0; font-size: 18px; line-height: 1.6; margin-bottom: 25px;">
                        Our <strong>FIRST EVER</strong> Discord giveaway starts at <strong>12:00 PM EST today</strong>! 
                        Don't miss your chance to win exclusive Elekin TCG prizes!
                    </p>
                    
                    <div class="discord-button">
                        <a href="https://discord.gg/PVrgZBmcMq" style="color: white; text-decoration: none; font-weight: bold;">
                            🎮 JOIN DISCORD NOW
                        </a>
                    </div>
                    
                    <p style="color: #a855f7; font-size: 16px; margin-top: 15px;">
                        ✨ <strong>What you can win:</strong> Exclusive card packs, promo cards, and special edition items!
                    </p>
                </td>
            </tr>
        </table>

        <!-- Pre-Launch Giveaways Section -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 20px; background: rgba(124, 58, 237, 0.15); border-radius: 10px; margin: 20px;">
                    <h3 style="color: #fcd34d; font-size: 24px; margin-bottom: 15px; text-align: center;">🎁 Join Discord for ALL Pre-Launch Giveaways!</h3>
                    <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; text-align: center;">
                        This is just the beginning! As we approach our June 2025 launch, we'll be hosting <strong>weekly giveaways</strong> 
                        exclusively for our Discord community members. From rare card previews to limited edition items, 
                        Discord members get first access to everything!
                    </p>
                    <ul style="color: #e2e8f0; font-size: 16px; line-height: 1.8; max-width: 400px; margin: 20px auto;">
                        <li>🎮 <strong>Weekly Discord Giveaways</strong></li>
                        <li>🃏 <strong>Exclusive Card Previews</strong></li>
                        <li>⚡ <strong>Early Access Opportunities</strong></li>
                        <li>👥 <strong>Community Game Nights</strong></li>
                        <li>📢 <strong>Launch Day Special Events</strong></li>
                    </ul>
                </td>
            </tr>
        </table>

        <!-- Social Media Follow Section -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 30px 20px; text-align: center;">
                    <h3 style="color: #fcd34d; font-size: 24px; margin-bottom: 20px;">📱 Follow Us & Boost Our Support!</h3>
                    <p style="color: #e2e8f0; font-size: 16px; margin-bottom: 25px;">
                        Help us grow the Elekin community! Follow us on social media to stay updated with the latest 
                        news, behind-the-scenes content, and participate in cross-platform contests!
                    </p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                        <tr>
                            <td style="padding: 10px;">
                                <a href="https://www.tiktok.com/@elekin_tcg" class="social-button" style="background: linear-gradient(135deg, #ff0050, #ff4040);">
                                    📱 Follow on TikTok
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">
                                <a href="https://www.instagram.com/elekin_tcg/" class="social-button" style="background: linear-gradient(135deg, #e4405f, #f77737);">
                                    📸 Follow on Instagram
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">
                                <a href="https://www.facebook.com/elekin.tcg" class="social-button" style="background: linear-gradient(135deg, #1877f2, #42a5f5);">
                                    👍 Like on Facebook
                                </a>
                            </td>
                        </tr>
                    </table>
                    
                    <p style="color: #a855f7; font-size: 14px; margin-top: 20px;">
                        Your follows and shares help us reach more TCG enthusiasts like you! 🚀
                    </p>
                </td>
            </tr>
        </table>

        <!-- Call to Action Summary -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 20px; background: linear-gradient(135deg, #7c3aed, #a855f7); text-align: center; border-radius: 10px; margin: 20px;">
                    <h3 style="color: white; font-size: 20px; margin-bottom: 15px;">🚀 Don't Miss Out!</h3>
                    <p style="color: white; font-size: 16px; margin-bottom: 20px;">
                        Join our Discord community TODAY for your chance to win in our first giveaway and 
                        stay connected for all future pre-launch events!
                    </p>
                    <div class="discord-button" style="background: rgba(255,255,255,0.2);">
                        <a href="https://discord.gg/PVrgZBmcMq" style="color: white; text-decoration: none; font-weight: bold;">
                            🎮 JOIN DISCORD - GIVEAWAY AT 12PM EST!
                        </a>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 30px 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
                    <p style="margin: 0 0 15px; color: #9ca3af; font-size: 14px;">
                        ⚡ Launching June 2025! Get ready for the ultimate TCG experience! ⚡
                    </p>
                    <p style="margin: 0 0 15px; color: #9ca3af; font-size: 12px;">
                        Elemental Games LLC © 2024. All rights reserved.
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                        You received this email because you subscribed to Elekin TCG updates.
                        <br><br>
                        <a href="https://elementalgames.gg/unsubscribe?email=SUBSCRIBER_EMAIL" style="color: #a855f7; text-decoration: none;">Unsubscribe</a>
                    </p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;

    // Send emails to all active subscribers (in batches to avoid rate limits)
    console.log('📤 Sending emails in batches...');
    const batchSize = 10;
    const emailPromises = [];
    
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      console.log(`📨 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(subscribers.length/batchSize)} (${batch.length} emails)`);
      
      const batchPromises = batch.map(async (subscriber) => {
        try {
          // Customize email content for each subscriber
          const personalizedHTML = discordGiveawayEmailHTML.replace(
            'SUBSCRIBER_EMAIL', 
            encodeURIComponent(subscriber.email)
          );

          const emailResponse = await resend.emails.send({
            from: 'Elemental Games <noreply@elementalgames.gg>',
            to: subscriber.email,
            subject: '🎁 FIRST Discord Giveaway at 12PM EST - Join Now!',
            html: personalizedHTML,
          });
          
          console.log(`✅ Sent to ${subscriber.email}`);
          return { 
            email: subscriber.email, 
            success: true, 
            response: emailResponse 
          };
        } catch (error) {
          console.error(`❌ Failed to send to ${subscriber.email}:`, error.message);
          return { 
            email: subscriber.email, 
            success: false, 
            error: error.message 
          };
        }
      });
      
      emailPromises.push(...batchPromises);
      
      // Add delay between batches to respect rate limits
      if (i + batchSize < subscribers.length) {
        console.log('⏱️  Waiting 1 second before next batch...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log('\n🎉 CAMPAIGN COMPLETED!');
    console.log(`✅ Successfully sent: ${successCount} emails`);
    console.log(`❌ Failed: ${failureCount} emails`);
    console.log(`📊 Total subscribers: ${subscribers.length}`);
    console.log(`⏰ Giveaway countdown set for: ${giveawayTime.toLocaleString('en-US', { timeZone: 'America/New_York' })} EST`);
    
    if (failureCount > 0) {
      console.log('\n❌ Failed emails:');
      results.filter(r => !r.success).forEach(result => {
        console.log(`   - ${result.email}: ${result.error}`);
      });
    }

  } catch (error) {
    console.error('💥 Error sending Discord giveaway email campaign:', error);
  }
}

// Run the campaign
sendDiscordGiveawayEmail(); 