import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY);

// Holiday Bundle Email HTML Template
function getHolidayBundlesEmailHTML() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎁 Holiday Bundles - Save Up to $30!</title>
    <style>
        body, table, td, p, a, li {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            display: block;
        }
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .content {
                padding: 30px 25px !important;
            }
            .bundle-card {
                width: 100% !important;
                margin-bottom: 20px !important;
            }
            .hero-text {
                font-size: 32px !important;
                line-height: 1.3 !important;
                margin-bottom: 20px !important;
            }
            .hero-subtext {
                font-size: 20px !important;
                line-height: 1.6 !important;
                padding: 0 5px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #1A103C; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #1A103C; border-radius: 8px; overflow: hidden;">
                    
                    <!-- Email Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #8A2BE2 0%, #f59e0b 100%); color: #ffffff; padding: 30px 20px; text-align: center; position: relative; overflow: hidden;">
                            <!-- Main Logo - Icon -->
                            <div style="position: relative; z-index: 1;">
                                <img src="https://elementalgames.gg/Elekin_Icon.png" alt="Elekin TCG" style="max-width: 200px; height: auto; margin: 0 auto 15px; display: block;">
                                <h1 style="margin: 0; font-size: 36px; font-weight: bold; letter-spacing: 2px;">🎁 HOLIDAY BUNDLES</h1>
                                <p style="margin: 10px 0 0; font-size: 20px; opacity: 0.95;">Save Up to $30 on Curated Bundles!</p>
                            </div>
                        </td>
                    </tr>

                    <!-- Hero Section -->
                    <tr>
                        <td class="content" style="padding: 40px 30px; text-align: center; background-color: #1A103C;">
                            <h2 class="hero-text" style="margin: 0 0 20px; color: #f59e0b; font-size: 40px; font-weight: bold; line-height: 1.2;">
                                Perfect Gifts for TCG Players!
                            </h2>
                            <p class="hero-subtext" style="margin: 0; color: #e0d4ff; font-size: 24px; line-height: 1.7; padding: 0 10px;">
                                Everything you need to start playing Elekin TCG - now at special holiday pricing!
                            </p>
                        </td>
                    </tr>

                    <!-- 2-Player Bundle (Featured) -->
                    <tr>
                        <td class="content" style="padding: 0 20px 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #8A2BE2 0%, #f59e0b 100%); border-radius: 12px; overflow: hidden; border: 3px solid #f59e0b;">
                                <!-- Bundle Image -->
                                <tr>
                                    <td style="padding: 0;">
                                        <img src="https://elementalgames.gg/images/products/in-person/x-13image.jpg" alt="2-Player Holiday Bundle" style="width: 100%; height: auto; display: block; max-height: 300px; object-fit: contain;">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                            <span style="color: #ffffff; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">⭐ PREMIUM BUNDLE</span>
                                        </div>
                                        <h3 style="margin: 0 0 15px; color: #ffffff; font-size: 32px; font-weight: bold;">2-Player Holiday Bundle</h3>
                                        <p style="margin: 0 0 20px; color: #ffffff; font-size: 18px; opacity: 0.95;">Perfect for friends, couples, or anyone who wants both decks!</p>
                                        
                                        <div style="background-color: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 8px; margin: 20px 0;">
                                            <p style="margin: 0 0 10px; color: #ffffff; font-size: 16px;"><strong>What's Included:</strong></p>
                                            <ul style="margin: 0; padding-left: 20px; color: #ffffff; text-align: left; font-size: 15px; line-height: 1.8;">
                                                <li>Dumoles Game Mat & Token Set</li>
                                                <li>Guardian's Sanctuary Game Mat & Token Set</li>
                                                <li>Crystal Starter Deck</li>
                                                <li>Lightning Starter Deck</li>
                                                <li>6 Booster Packs (3 for each player)</li>
                                            </ul>
                                        </div>

                                        <div style="margin: 25px 0;">
                                            <p style="margin: 0 0 5px; color: #ffffff; font-size: 24px; font-weight: bold;">$90</p>
                                            <p style="margin: 0; color: #ffffff; font-size: 18px; text-decoration: line-through; opacity: 0.7;">Regular: $120</p>
                                            <p style="margin: 10px 0 0; color: #4ade80; font-size: 20px; font-weight: bold;">Save $30! 🎉</p>
                                        </div>

                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 25px auto 0;">
                                            <tr>
                                                <td style="padding: 15px 40px; background-color: #ffffff; border-radius: 8px;">
                                                    <a href="https://www.elementalgames.gg/bundle/bundle_2player?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=main_cta" 
                                                       style="color: #8A2BE2; text-decoration: none; font-size: 18px; font-weight: bold; display: block;">
                                                        Shop 2-Player Bundle →
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Other Bundles -->
                    <tr>
                        <td class="content" style="padding: 0 20px 30px;">
                            <h3 style="margin: 0 0 25px; color: #f59e0b; font-size: 28px; font-weight: bold; text-align: center;">Starter Bundles - $50 Each</h3>
                            
                            <!-- Dumoles Bundle -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #2d1b4e; border-radius: 12px; border: 2px solid #8A2BE2; overflow: hidden;">
                                <!-- Bundle Image -->
                                <tr>
                                    <td width="600" style="width: 100%; max-width: 600px; padding: 0; background-color: #2d1b4e; text-align: center; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 0; background-color: #2d1b4e;">
                                                    <a href="https://www.elementalgames.gg/bundle/bundle_dumoles?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=starter_dumoles" style="display: block; text-decoration: none;">
                                                        <img src="https://elementalgames.gg/images/products/in-person/x-12image.jpg" alt="Dumoles Holiday Bundle" width="600" border="0" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0; outline: none; background-color: #2d1b4e; -ms-interpolation-mode: bicubic;">
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 25px;">
                                        <h4 style="margin: 0 0 10px; color: #f59e0b; font-size: 24px; font-weight: bold;">Dumoles Holiday Bundle</h4>
                                        <p style="margin: 0 0 15px; color: #e0d4ff; font-size: 16px;">Perfect starter bundle for Crystal players!</p>
                                        
                                        <div style="background-color: rgba(138, 43, 226, 0.2); padding: 15px; border-radius: 8px; margin: 15px 0;">
                                            <p style="margin: 0 0 8px; color: #ffffff; font-size: 14px; font-weight: bold;">Includes:</p>
                                            <ul style="margin: 0; padding-left: 20px; color: #e0d4ff; font-size: 14px; line-height: 1.6;">
                                                <li>Dumoles Game Mat & Token Set</li>
                                                <li>3 Booster Packs</li>
                                                <li>Crystal Starter Deck</li>
                                            </ul>
                                        </div>

                                        <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0;">
                                            <div>
                                                <p style="margin: 0; color: #f59e0b; font-size: 28px; font-weight: bold;">$50</p>
                                                <p style="margin: 5px 0 0; color: #9ca3af; font-size: 16px; text-decoration: line-through;">$60</p>
                                            </div>
                                            <p style="margin: 0; color: #4ade80; font-size: 16px; font-weight: bold;">Save $10!</p>
                                        </div>

                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 12px 30px; background-color: #f59e0b; border-radius: 6px;">
                                                    <a href="https://www.elementalgames.gg/bundle/bundle_dumoles?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=starter_dumoles_cta" 
                                                       style="color: #1A103C; text-decoration: none; font-size: 16px; font-weight: bold; display: block;">
                                                        Shop Now →
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Guardian Bundle -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #2d1b4e; border-radius: 12px; border: 2px solid #8A2BE2; overflow: hidden;">
                                <!-- Bundle Image -->
                                <tr>
                                    <td width="600" style="width: 100%; max-width: 600px; padding: 0; background-color: #2d1b4e; text-align: center; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 0; background-color: #2d1b4e;">
                                                    <a href="https://www.elementalgames.gg/bundle/bundle_guardian?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=starter_guardian" style="display: block; text-decoration: none;">
                                                        <img src="https://elementalgames.gg/images/products/in-person/x-11image.jpg" alt="Guardian Holiday Bundle" width="600" border="0" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0; outline: none; background-color: #2d1b4e; -ms-interpolation-mode: bicubic;">
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 25px;">
                                        <h4 style="margin: 0 0 10px; color: #f59e0b; font-size: 24px; font-weight: bold;">Guardian Holiday Bundle</h4>
                                        <p style="margin: 0 0 15px; color: #e0d4ff; font-size: 16px;">Perfect starter bundle for Lightning players!</p>
                                        
                                        <div style="background-color: rgba(138, 43, 226, 0.2); padding: 15px; border-radius: 8px; margin: 15px 0;">
                                            <p style="margin: 0 0 8px; color: #ffffff; font-size: 14px; font-weight: bold;">Includes:</p>
                                            <ul style="margin: 0; padding-left: 20px; color: #e0d4ff; font-size: 14px; line-height: 1.6;">
                                                <li>Guardian's Sanctuary Game Mat & Token Set</li>
                                                <li>3 Booster Packs</li>
                                                <li>Lightning Starter Deck</li>
                                            </ul>
                                        </div>

                                        <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0;">
                                            <div>
                                                <p style="margin: 0; color: #f59e0b; font-size: 28px; font-weight: bold;">$50</p>
                                                <p style="margin: 5px 0 0; color: #9ca3af; font-size: 16px; text-decoration: line-through;">$60</p>
                                            </div>
                                            <p style="margin: 0; color: #4ade80; font-size: 16px; font-weight: bold;">Save $10!</p>
                                        </div>

                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 12px 30px; background-color: #f59e0b; border-radius: 6px;">
                                                    <a href="https://www.elementalgames.gg/bundle/bundle_guardian?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=starter_guardian_cta" 
                                                       style="color: #1A103C; text-decoration: none; font-size: 16px; font-weight: bold; display: block;">
                                                        Shop Now →
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Pack Bundle -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px; background-color: #2d1b4e; border-radius: 12px; border: 2px solid #8A2BE2; overflow: hidden;">
                                <!-- Bundle Image -->
                                <tr>
                                    <td style="padding: 0; background-color: #2d1b4e;">
                                        <img src="https://elementalgames.gg/images/products/in-person/x-12packs.jpg" alt="Holiday Pack Bundle" width="600" height="auto" style="width: 100%; max-width: 600px; height: auto; display: block; max-height: 300px; object-fit: cover; border: 0; outline: none;">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 25px;">
                                        <h4 style="margin: 0 0 10px; color: #f59e0b; font-size: 24px; font-weight: bold;">Holiday Pack Bundle</h4>
                                        <p style="margin: 0 0 15px; color: #e0d4ff; font-size: 16px;">Stock up on cards - 12 packs for the price of 10!</p>
                                        
                                        <div style="background-color: rgba(138, 43, 226, 0.2); padding: 15px; border-radius: 8px; margin: 15px 0;">
                                            <p style="margin: 0 0 8px; color: #ffffff; font-size: 14px; font-weight: bold;">Includes:</p>
                                            <ul style="margin: 0; padding-left: 20px; color: #e0d4ff; font-size: 14px; line-height: 1.6;">
                                                <li>12 Booster Packs (Demo Day Edition)</li>
                                                <li style="color: #4ade80; font-weight: bold;">That's 2 packs FREE! 🎁</li>
                                            </ul>
                                        </div>

                                        <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0;">
                                            <div>
                                                <p style="margin: 0; color: #f59e0b; font-size: 28px; font-weight: bold;">$50</p>
                                                <p style="margin: 5px 0 0; color: #9ca3af; font-size: 16px; text-decoration: line-through;">$60</p>
                                            </div>
                                            <p style="margin: 0; color: #4ade80; font-size: 16px; font-weight: bold;">Save $10!</p>
                                        </div>

                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 12px 30px; background-color: #f59e0b; border-radius: 6px;">
                                                    <a href="https://www.elementalgames.gg/bundle/bundle_packs?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=packs_cta" 
                                                       style="color: #1A103C; text-decoration: none; font-size: 16px; font-weight: bold; display: block;">
                                                        Shop Now →
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Main CTA -->
                    <tr>
                        <td class="content" style="padding: 0 20px 40px; text-align: center;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="padding: 18px 50px; background: linear-gradient(135deg, #8A2BE2 0%, #f59e0b 100%); border-radius: 8px;">
                                        <a href="https://www.elementalgames.gg/bundle/bundle_2player?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=bottom_cta" 
                                           style="color: #ffffff; text-decoration: none; font-size: 20px; font-weight: bold; display: block;">
                                            Shop the 2-Player Holiday Bundle →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Shipping Info -->
                    <tr>
                        <td class="content" style="padding: 0 20px 30px;">
                            <div style="background-color: rgba(138, 43, 226, 0.1); border-radius: 8px; padding: 20px; text-align: center;">
                                <p style="margin: 0 0 8px; color: #f59e0b; font-size: 16px; font-weight: bold;">🚚 Fast Shipping</p>
                                <p style="margin: 0; color: #e0d4ff; font-size: 14px;">
                                    Ships in 3-5 business days • 30-day return policy
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Social Links -->
                    <tr>
                        <td class="content" style="padding: 0 20px 30px; text-align: center; border-top: 1px solid rgba(138, 43, 226, 0.3); padding-top: 30px;">
                            <p style="margin: 0 0 15px; color: #e0d4ff; font-size: 16px; font-weight: bold;">Follow Us for Updates & Giveaways</p>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="padding: 0 10px;">
                                        <a href="https://discord.gg/PVrgZBmcMq" style="color: #8A2BE2; text-decoration: none; font-size: 14px;">Discord</a>
                                    </td>
                                    <td style="padding: 0 10px;">
                                        <a href="https://x.com/elekin_tcg" style="color: #8A2BE2; text-decoration: none; font-size: 14px;">Twitter</a>
                                    </td>
                                    <td style="padding: 0 10px;">
                                        <a href="https://www.instagram.com/elekin_tcg/" style="color: #8A2BE2; text-decoration: none; font-size: 14px;">Instagram</a>
                                    </td>
                                    <td style="padding: 0 10px;">
                                        <a href="https://www.tiktok.com/@elekin_tcg" style="color: #8A2BE2; text-decoration: none; font-size: 14px;">TikTok</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0f071f; padding: 30px 20px; text-align: center; color: #9ca3af; font-size: 12px;">
                            <p style="margin: 0 0 10px;">You received this email because you subscribed to Elekin TCG updates.</p>
                            <p style="margin: 0 0 10px;">Questions? Reply to this email - we read every message!</p>
                            <a href="https://elementalgames.gg/unsubscribe" style="color: #8A2BE2; text-decoration: underline;">Unsubscribe</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

// Text version for email clients that don't support HTML
function getHolidayBundlesEmailText() {
  return `
🎁 HOLIDAY BUNDLES - Save Up to $30!

Perfect Gifts for TCG Players!
Everything you need to start playing Elekin TCG - now at special holiday pricing!

⭐ PREMIUM BUNDLE
2-Player Holiday Bundle - $90 (Regular: $120) - Save $30!
Perfect for friends, couples, or anyone who wants both decks!

What's Included:
- Dumoles Game Mat & Token Set
- Guardian's Sanctuary Game Mat & Token Set
- Crystal Starter Deck
- Lightning Starter Deck
- 6 Booster Packs (3 for each player)

Shop: https://www.elementalgames.gg/bundle/bundle_2player?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=text_main

STARTER BUNDLES - $50 Each (Regular: $60) - Save $10!

Dumoles Holiday Bundle
Perfect starter bundle for Crystal players!
- Dumoles Game Mat & Token Set
- 3 Booster Packs
- Crystal Starter Deck
Shop: https://www.elementalgames.gg/bundle/bundle_dumoles?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=text_dumoles

Guardian Holiday Bundle
Perfect starter bundle for Lightning players!
- Guardian's Sanctuary Game Mat & Token Set
- 3 Booster Packs
- Lightning Starter Deck
Shop: https://www.elementalgames.gg/bundle/bundle_guardian?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=text_guardian

Holiday Pack Bundle
Stock up on cards - 12 packs for the price of 10!
- 12 Booster Packs (Demo Day Edition)
- That's 2 packs FREE!
Shop: https://www.elementalgames.gg/bundle/bundle_packs?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=text_packs

⚠️ Important: Bundles are already discounted and cannot be combined with other discount codes or promotions.

🚚 Fast Shipping: Ships in 3-5 business days • 30-day return policy

Primary Bundle: https://www.elementalgames.gg/bundle/bundle_2player?utm_source=email&utm_medium=newsletter&utm_campaign=holiday_bundles_2025_12&utm_content=text_bottom

Follow Us:
Discord: https://discord.gg/PVrgZBmcMq
Twitter: https://x.com/elekin_tcg
Instagram: https://www.instagram.com/elekin_tcg/
TikTok: https://www.tiktok.com/@elekin_tcg

You received this email because you subscribed to Elekin TCG updates.
Unsubscribe: https://elementalgames.gg/unsubscribe
`;
}

async function sendHolidayBundlesEmail(options = {}) {
  const { 
    testEmail = false, 
    email: testEmailAddress = 'mark@elementalgames.gg',
    sendToAll = false 
  } = options;

  try {
    let recipients = [];

    if (testEmail) {
      recipients = [testEmailAddress];
      console.log(`📧 Sending TEST holiday bundles email to: ${testEmailAddress}`);
    } else if (sendToAll) {
      // Fetch subscribers from Supabase
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
      const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase credentials not found');
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: subscribers, error } = await supabase
        .from('subscribers')
        .select('email')
        .eq('status', 'active');

      if (error) {
        throw new Error(`Failed to fetch subscribers: ${error.message}`);
      }

      if (!subscribers || subscribers.length === 0) {
        console.log('No active subscribers found');
        return { success: false, message: 'No active subscribers found' };
      }

      recipients = subscribers.map(sub => sub.email);
      console.log(`📧 Sending holiday bundles email to ${recipients.length} subscribers`);
    } else {
      throw new Error('Either testEmail or sendToAll must be true');
    }

    const subject = testEmail 
      ? '🧪 TEST: 🎁 Holiday Bundles - Save Up to $30!' 
      : '🎁 Holiday Bundles - Save Up to $30!';

    const emailData = {
      from: 'Elemental Games <mark@elementalgames.gg>',
      to: recipients,
      subject: subject,
      html: getHolidayBundlesEmailHTML(),
      text: getHolidayBundlesEmailText(),
    };

    const result = await resend.emails.send(emailData);

    if (result.error) {
      throw new Error(result.error.message || 'Failed to send email');
    }

    console.log('✅ Holiday bundles email sent successfully!');
    console.log(`   Message ID: ${result.data?.id}`);
    console.log(`   Recipients: ${recipients.length}`);

    return {
      success: true,
      messageId: result.data?.id,
      recipients: recipients.length,
      message: testEmail 
        ? `Test email sent to ${testEmailAddress}` 
        : `Email sent to ${recipients.length} subscribers`
    };

  } catch (error) {
    console.error('❌ Error sending holiday bundles email:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to send holiday bundles email'
    };
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const testEmail = args.includes('--test');
  const sendToAll = args.includes('--send-all');
  const email = args.find(arg => arg.startsWith('--email='))?.split('=')[1];

  sendHolidayBundlesEmail({
    testEmail: testEmail || !sendToAll,
    email: email || 'mark@elementalgames.gg',
    sendToAll: sendToAll
  }).then(result => {
    console.log('\n📊 Result:', result);
    process.exit(result.success ? 0 : 1);
  });
}

export { sendHolidayBundlesEmail, getHolidayBundlesEmailHTML, getHolidayBundlesEmailText };


