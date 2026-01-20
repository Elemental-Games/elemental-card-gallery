export const getKickstarterWeek2EmailHTML = (email) => {
  const unsubscribeToken = Buffer.from(email).toString('base64');
  const unsubscribeUrl = `${process.env.SITE_URL || 'https://elementalgames.gg'}/unsubscribe?token=${unsubscribeToken}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1 Week Until Launch!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1A103C; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1A103C;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #2d1b69 0%, #4c1d95 100%); border-radius: 12px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #1A103C; font-size: 32px; font-weight: bold;">1 Week Until Launch! 🚀</h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px; color: #ffffff;">
                            <h2 style="margin: 0 0 20px; color: #fbbf24; font-size: 24px;">The Final Countdown</h2>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                                We're just <strong style="color: #fbbf24;">1 week away</strong> from launching our Kickstarter on <strong style="color: #fbbf24;">February 17, 2026</strong>!
                            </p>

                            <div style="background: rgba(251, 191, 36, 0.1); border: 2px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 30px 0;">
                                <h3 style="margin: 0 0 15px; color: #fbbf24; font-size: 20px;">💰 Early Bird Pricing Reminder</h3>
                                <p style="margin: 0 0 15px; font-size: 16px; color: #e5e7eb;">
                                    <strong style="color: #fbbf24;">Save 20-30%</strong> by backing in the first 48 hours!
                                </p>
                                <p style="margin: 0; font-size: 14px; color: #d1d5db;">
                                    Early Bird: $75 (regular $90) - Limited to first 100 backers
                                </p>
                            </div>

                            <h3 style="margin: 30px 0 15px; color: #fbbf24; font-size: 20px;">What Happens on Launch Day:</h3>
                            <ul style="margin: 0 0 30px; padding-left: 20px; color: #e5e7eb; font-size: 16px; line-height: 1.8;">
                                <li>You'll receive an email with a direct link to our Kickstarter page</li>
                                <li>Early bird pricing will be available for the first 48 hours</li>
                                <li>Exclusive rewards unlock as we hit funding milestones</li>
                                <li>Join our Discord launch party for live updates and community celebration</li>
                            </ul>

                            <!-- CTA Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <p style="margin: 0 0 15px; font-size: 16px; color: #e5e7eb; font-weight: bold;">One week to go - secure your spot:</p>
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
                                            Set a reminder for <strong style="color: #fbbf24;">February 17, 2026</strong> - early bird pricing is limited!
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
                                Next update: 3 days until launch!
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

