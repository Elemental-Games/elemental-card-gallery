import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function sendTestEmail() {
  console.log('🚀 Sending Air Kingdom test email to mark@elementalgames.gg');
  
  const resend = new Resend(RESEND_API_KEY);
  
  const subject = '🧪 TEST: Zalos, The Air Kingdom, Rises 💨';
  
  // HTML content with all our updates
  const airKingdomEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Air Kingdom Rises</title>
    <style>
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
        }
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .content {
                padding: 20px !important;
            }
            .hero-text {
                font-size: 28px !important;
            }
            .hero-subtext {
                font-size: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Email Header -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); color: #ffffff; padding: 20px; text-align: center;">
                            <img src="https://elementalgames.gg/Elekin_Kinbrold_Icon.png" alt="Elekin TCG" style="height: 60px; margin-bottom: 10px;">
                            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Weekly Kingdom Reveal</p>
                        </td>
                    </tr>

                    <!-- Hero Section -->
                    <tr>
                        <td style="position: relative;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="background-image: url('https://elementalgames.gg/images/kingdom-headers/zalos-header.webp'); background-size: cover; background-position: center; height: 320px; position: relative;">
                                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);"></div>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="height: 320px;">
                                            <tr>
                                                <td align="center" valign="middle" style="position: relative; z-index: 2; color: #ffffff; text-align: center; padding: 20px;">
                                                    <h2 class="hero-text" style="margin: 0 0 10px; font-size: 36px; font-weight: bold; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); -webkit-text-stroke: 1px rgba(255,255,255,0.3);">
                                                        MASTER THE WINDS.
                                                    </h2>
                                                    <h3 class="hero-subtext" style="margin: 0 0 15px; font-size: 26px; font-weight: bold; letter-spacing: 1px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); -webkit-text-stroke: 1px rgba(255,255,255,0.3);">
                                                        RULE THE BATTLEFIELD.
                                                    </h3>
                                                    <p style="margin: 0; font-size: 18px; opacity: 0.9; max-width: 400px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); -webkit-text-stroke: 0.5px rgba(255,255,255,0.2);">
                                                        Galea's domain opens its gates. Three air creatures await their reveal.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td class="content" style="padding: 40px;">
                            
                            <!-- Welcome Message -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: center; margin-bottom: 30px;">
                                        <h3 style="margin: 0 0 15px; color: #2563eb; font-size: 28px; font-weight: bold;">
                                            The Air Kingdom Rises 💨
                                        </h3>
                                        <p style="margin: 0; color: #374151; font-size: 18px; line-height: 1.6;">
                                            High above the clouds, where wind meets wisdom, Galea's floating kingdom 
                                            awaits your command. This week, three legendary air creatures join the battle.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Galea Spotlight -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td style="width: 200px; vertical-align: top;">
                                        <img src="https://elementalgames.gg/images/cards/new-marketing/galea-t.webp" 
                                             alt="Galea, Air Elementalist"
                                             style="width: 200px; height: auto; display: block;">
                                    </td>
                                    <td style="padding: 30px; vertical-align: top;">
                                        <h4 style="margin: 0 0 15px; color: #2563eb; font-size: 24px; font-weight: bold;">
                                            Meet Galea, Air Elementalist
                                        </h4>
                                        <p style="margin: 0 0 20px; color: #374151; line-height: 1.6;">
                                            Master of the floating kingdom, Galea commands the very winds themselves. 
                                            Her tactical brilliance and elemental mastery make her a formidable ally 
                                            in any battle.
                                        </p>
                                        <div style="background-color: #eff6ff; padding: 15px; border-radius: 6px;">
                                            <p style="margin: 0 0 8px; color: #1e40af; font-size: 14px; font-weight: 600;">
                                                💨 Elemental Mastery: Control air currents and wind pressure
                                            </p>
                                            <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                                                🏰 Kingdom Power: Command floating citadels and sky fortresses
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Card Showcase -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0;">
                                <tr>
                                    <td>
                                        <h4 style="margin: 0 0 30px; color: #1f2937; font-size: 24px; font-weight: bold; text-align: center;">
                                            New Air Creatures This Week
                                        </h4>

                                        <!-- Swoop Card -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            <tr>
                                                <td style="width: 200px; vertical-align: top;">
                                                    <img src="https://elementalgames.gg/images/cards/new-marketing/swoop-r.webp" 
                                                         alt="Swoop"
                                                         style="width: 200px; height: auto; display: block;">
                                                </td>
                                                <td style="padding: 30px; vertical-align: middle;">
                                                    <h5 style="margin: 0 0 10px; color: #2563eb; font-size: 28px; font-weight: bold;">Swoop</h5>
                                                    <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px; font-style: italic;">Swift aerial predator</p>
                                                    <div style="background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 15px; border-radius: 6px;">
                                                        <p style="margin: 0 0 5px; font-weight: 600;">📅 Release Date:</p>
                                                        <p style="margin: 0; font-size: 16px; font-weight: bold;">July 1st, 2025</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Dumoles Card -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            <tr>
                                                <td style="width: 200px; vertical-align: top;">
                                                    <img src="https://elementalgames.gg/images/cards/new-marketing/dumoles-r.webp" 
                                                         alt="Dumoles"
                                                         style="width: 200px; height: auto; display: block;">
                                                </td>
                                                <td style="padding: 30px; vertical-align: middle;">
                                                    <h5 style="margin: 0 0 10px; color: #2563eb; font-size: 28px; font-weight: bold;">Dumoles</h5>
                                                    <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px; font-style: italic;">Tactical air support</p>
                                                    <div style="background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 15px; border-radius: 6px;">
                                                        <p style="margin: 0 0 5px; font-weight: 600;">📅 Release Date:</p>
                                                        <p style="margin: 0; font-size: 16px; font-weight: bold;">July 2nd, 2025</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Nimbus Card -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            <tr>
                                                <td style="width: 200px; vertical-align: top;">
                                                    <img src="https://elementalgames.gg/images/cards/new-marketing/nimbus-r.webp" 
                                                         alt="Nimbus"
                                                         style="width: 200px; height: auto; display: block;">
                                                </td>
                                                <td style="padding: 30px; vertical-align: middle;">
                                                    <h5 style="margin: 0 0 10px; color: #2563eb; font-size: 28px; font-weight: bold;">Nimbus</h5>
                                                    <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px; font-style: italic;">Master of the winds</p>
                                                    <div style="background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 15px; border-radius: 6px;">
                                                        <p style="margin: 0 0 5px; font-weight: 600;">📅 Release Date:</p>
                                                        <p style="margin: 0; font-size: 16px; font-weight: bold;">July 3rd, 2025</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Weekly Giveaway Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0; background: linear-gradient(90deg, #fef3c7 0%, #fed7aa 100%); border: 2px solid #f59e0b; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <h4 style="margin: 0 0 20px; color: #ea580c; font-size: 24px; font-weight: bold;">
                                            🎁 Weekly Giveaway - Air Kingdom Edition
                                        </h4>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 50%; padding: 10px; vertical-align: top;">
                                                    <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #fbbf24; min-height: 100px; display: flex; flex-direction: column; justify-content: center;">
                                                        <div style="font-size: 24px; margin-bottom: 8px; text-align: center;">🏆</div>
                                                        <h5 style="margin: 0 0 8px; color: #1f2937; font-size: 14px; font-weight: bold; text-align: center;">Grand Prize</h5>
                                                        <p style="margin: 0; color: #4b5563; font-size: 12px; text-align: center; line-height: 1.3;">
                                                            1 lucky subscriber wins an <strong>exclusive Galea promo card</strong> post-launch!
                                                        </p>
                                                    </div>
                                                </td>
                                                <td style="width: 50%; padding: 10px; vertical-align: top;">
                                                    <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #fbbf24; min-height: 100px; display: flex; flex-direction: column; justify-content: center;">
                                                        <div style="font-size: 24px; margin-bottom: 8px; text-align: center;">🎪</div>
                                                        <h5 style="margin: 0 0 8px; color: #1f2937; font-size: 14px; font-weight: bold; text-align: center;">Runner-Up Prizes</h5>
                                                        <p style="margin: 0; color: #4b5563; font-size: 12px; text-align: center; line-height: 1.3;">
                                                            2 lucky subscribers win <strong>free booster packs</strong> post-launch!
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <div style="background-color: #2563eb; color: #ffffff; padding: 20px; border-radius: 6px; margin-top: 20px;">
                                            <p style="margin: 0 0 10px; font-weight: 600;">How to Enter:</p>
                                            <p style="margin: 0; font-size: 14px;">
                                                Join our Discord and follow us on social media to participate in all giveaways!
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Call to Action -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 15px 30px; background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); border-radius: 6px;">
                                                    <a href="https://elementalgames.gg/kinbrold/zalos" 
                                                       style="color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 600; display: block;">
                                                        Explore the Air Kingdom
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="text-align: center;">
                                        <div style="margin-bottom: 20px;">
                                            <a href="https://discord.gg/PVrgZBmcMq" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                                <img src="https://elementalgames.gg/discord.svg" alt="Discord" style="width: 24px; height: 24px;">
                                            </a>
                                            <a href="https://www.instagram.com/elekin_tcg/" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                                <img src="https://elementalgames.gg/instagram-brands-solid.svg" alt="Instagram" style="width: 24px; height: 24px;">
                                            </a>
                                            <a href="https://www.tiktok.com/@elekin_tcg" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                                <img src="https://elementalgames.gg/tiktok1.webp" alt="TikTok" style="width: 24px; height: 24px;">
                                            </a>
                                        </div>
                                        
                                        <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                                            <strong>Elemental Masters</strong><br>
                                            Where strategy meets magic
                                        </p>
                                        
                                        <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                            You received this email because you subscribed to updates about Elekin.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

  try {
    const emailResponse = await resend.emails.send({
      from: 'Elemental Masters <contact@elementalgames.gg>',
      to: 'mark@elementalgames.gg',
      subject: subject,
      html: airKingdomEmailHTML,
    });

    console.log('✅ Email sent successfully!');
    console.log('📬 Email ID:', emailResponse.id);
    console.log('📧 Sent to: mark@elementalgames.gg');
    console.log('📝 Subject:', subject);
    console.log('🎉 Check your inbox in a few seconds!');

  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

sendTestEmail(); 