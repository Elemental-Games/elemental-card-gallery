export const getKickstarterWelcomeEmailHTML = (email) => {
  const unsubscribeToken = Buffer.from(email).toString('base64');
  const unsubscribeUrl = `${process.env.SITE_URL || 'https://elementalgames.gg'}/unsubscribe?token=${unsubscribeToken}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Elekin TCG Kickstarter Updates</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1A103C; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1A103C;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #2d1b69 0%, #4c1d95 100%); border-radius: 12px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center;">
                            <img src="https://elementalgames.gg/Elekin_Kinbrold.png" alt="Elekin TCG" style="max-width: 200px; height: auto; margin-bottom: 10px;">
                            <h1 style="margin: 0; color: #1A103C; font-size: 28px; font-weight: bold;">Welcome to Elekin TCG!</h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px; color: #ffffff;">
                            <h2 style="margin: 0 0 20px; color: #fbbf24; font-size: 24px;">You're In! 🎉</h2>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                                Thank you for signing up! You're now on our exclusive list for <strong style="color: #fbbf24;">Kickstarter launch notifications</strong>.
                            </p>

                            <div style="background: rgba(251, 191, 36, 0.1); border: 2px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 30px 0;">
                                <h3 style="margin: 0 0 15px; color: #fbbf24; font-size: 20px;">🚀 Launch Date: February 17, 2026</h3>
                                <p style="margin: 0; font-size: 16px; color: #e5e7eb;">
                                    We'll notify you the moment our Kickstarter goes live, so you can secure early bird pricing and exclusive rewards!
                                </p>
                            </div>

                            <h3 style="margin: 30px 0 15px; color: #fbbf24; font-size: 20px;">What You'll Get:</h3>
                            <ul style="margin: 0 0 30px; padding-left: 20px; color: #e5e7eb; font-size: 16px; line-height: 1.8;">
                                <li><strong style="color: #fbbf24;">Early bird pricing</strong> - 20-30% off launch day prices</li>
                                <li><strong style="color: #fbbf24;">Exclusive rewards</strong> - Limited edition cards and items</li>
                                <li><strong style="color: #fbbf24;">First access</strong> - Be among the first to back our campaign</li>
                                <li><strong style="color: #fbbf24;">VIP status</strong> - Special Discord role and community perks</li>
                            </ul>

                            <!-- CTA Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <p style="margin: 0 0 15px; font-size: 16px; color: #e5e7eb; font-weight: bold;">Help us build momentum before launch:</p>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 10px;">
                                                    <a href="https://www.kickstarter.com/projects/elemental-games/elekin" style="display: inline-block; background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%); color: #1A103C; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px; text-align: center;">
                                                        🔔 Notify Me on Kickstarter
                                                    </a>
                                                </td>
                                                <td style="padding: 0 10px;">
                                                    <a href="https://elementalgames.gg/shop" style="display: inline-block; background: linear-gradient(90deg, #7c3aed 0%, #5b21b6 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px; text-align: center;">
                                                        🛒 Shop Demo Day Edition
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="margin: 15px 0 0; font-size: 14px; color: #9ca3af; text-align: center;">
                                            Following us on Kickstarter helps boost our visibility and gets you notified the moment we launch!
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 30px 0 0; font-size: 14px; color: #9ca3af; text-align: center;">
                                Or check out our <a href="https://elementalgames.gg/kickstarter" style="color: #fbbf24;">Kickstarter preview</a> and join our <a href="https://discord.gg/PVrgZBmcMq" style="color: #fbbf24;">Discord community</a>!
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1A103C; padding: 20px; text-align: center; border-top: 1px solid #4c1d95;">
                            <p style="margin: 0 0 10px; font-size: 12px; color: #9ca3af;">
                                You received this email because you signed up for Elekin TCG Kickstarter updates.
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

export const getKickstarterWelcomeEmailText = (email) => {
  return `
Welcome to Elekin TCG!

Thank you for signing up! You're now on our exclusive list for Kickstarter launch notifications.

🚀 Launch Date: February 17, 2026

We'll notify you the moment our Kickstarter goes live, so you can secure early bird pricing and exclusive rewards!

What You'll Get:
- Early bird pricing - 20-30% off launch day prices
- Exclusive rewards - Limited edition cards and items
- First access - Be among the first to back our campaign
- VIP status - Special Discord role and community perks

View our Kickstarter preview: https://elementalgames.gg/kickstarter

In the meantime, check out our website and join our Discord community!

Unsubscribe: ${process.env.SITE_URL || 'https://elementalgames.gg'}/unsubscribe?token=${Buffer.from(email).toString('base64')}
  `;
};

