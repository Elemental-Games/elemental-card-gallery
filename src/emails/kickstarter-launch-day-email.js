export const getKickstarterLaunchDayEmailHTML = (email) => {
  const unsubscribeToken = Buffer.from(email).toString('base64');
  const unsubscribeUrl = `${process.env.SITE_URL || 'https://elementalgames.gg'}/unsubscribe?token=${unsubscribeToken}`;
  const kickstarterUrl = 'https://www.kickstarter.com/projects/elemental-games/elekin';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WE'RE LIVE! Elekin TCG Kickstarter</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1A103C; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1A103C;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #2d1b69 0%, #4c1d95 100%); border-radius: 12px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #1A103C; font-size: 36px; font-weight: bold;">🚀 WE'RE LIVE! 🚀</h1>
                            <p style="margin: 10px 0 0; color: #1A103C; font-size: 20px; font-weight: bold;">Elekin TCG Kickstarter is Now Live!</p>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px; color: #ffffff;">
                            <h2 style="margin: 0 0 20px; color: #fbbf24; font-size: 24px;">The Moment You've Been Waiting For</h2>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                                Our Kickstarter campaign is <strong style="color: #fbbf24;">LIVE NOW</strong>! This is your chance to secure early bird pricing and exclusive rewards.
                            </p>

                            <div style="background: rgba(251, 191, 36, 0.1); border: 2px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 30px 0;">
                                <h3 style="margin: 0 0 15px; color: #fbbf24; font-size: 20px;">⏰ Early Bird Pricing - First 48 Hours Only!</h3>
                                <p style="margin: 0 0 10px; font-size: 16px; color: #e5e7eb;">
                                    <strong style="color: #fbbf24;">Save 20-30%</strong> by backing in the next 48 hours!
                                </p>
                                <ul style="margin: 10px 0 0; padding-left: 20px; color: #e5e7eb; font-size: 16px; line-height: 1.8;">
                                    <li><strong style="color: #fbbf24;">Early Bird:</strong> $75 (was $90) - First 100 backers only</li>
                                    <li><strong style="color: #fbbf24;">Standard:</strong> $90 - 2-Player Starter Bundle</li>
                                    <li><strong style="color: #fbbf24;">Collector:</strong> $150 - Deluxe Collection</li>
                                </ul>
                            </div>

                            <!-- CTA Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <p style="margin: 0 0 15px; font-size: 18px; color: #e5e7eb; font-weight: bold;">Ready to back Elekin TCG?</p>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 10px;">
                                                    <a href="${kickstarterUrl}" style="display: inline-block; background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%); color: #1A103C; text-decoration: none; padding: 18px 35px; border-radius: 8px; font-weight: bold; font-size: 18px; text-align: center;">
                                                        🚀 Back on Kickstarter
                                                    </a>
                                                </td>
                                                <td style="padding: 0 10px;">
                                                    <a href="https://elementalgames.gg/shop" style="display: inline-block; background: linear-gradient(90deg, #7c3aed 0%, #5b21b6 100%); color: #ffffff; text-decoration: none; padding: 18px 35px; border-radius: 8px; font-weight: bold; font-size: 18px; text-align: center;">
                                                        🛒 Shop Demo Day Edition
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="margin: 20px 0 0; font-size: 14px; color: #9ca3af; text-align: center;">
                                            Thank you for your support! Let's make Elekin TCG a reality together! 🎉
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1A103C; padding: 20px; text-align: center; border-top: 1px solid #4c1d95;">
                            <p style="margin: 0 0 10px; font-size: 12px; color: #9ca3af;">
                                Join our <a href="https://discord.gg/PVrgZBmcMq" style="color: #fbbf24;">Discord</a> for launch party updates!
                            </p>
                            <p style="margin: 0; font-size: 12px;">
                                <a href="${unsubscribeUrl}" style="color: #fbbf24; text-decoration: underline;">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};

