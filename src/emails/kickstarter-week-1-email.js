export const getKickstarterWeek1EmailHTML = (email) => {
  const unsubscribeToken = Buffer.from(email).toString('base64');
  const unsubscribeUrl = `${process.env.SITE_URL || 'https://elementalgames.gg'}/unsubscribe?token=${unsubscribeToken}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2 Weeks Until Launch!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1A103C; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1A103C;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #2d1b69 0%, #4c1d95 100%); border-radius: 12px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #1A103C; font-size: 32px; font-weight: bold;">2 Weeks Until Launch! ⏰</h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px; color: #ffffff;">
                            <h2 style="margin: 0 0 20px; color: #fbbf24; font-size: 24px;">The Countdown Begins</h2>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                                We're just <strong style="color: #fbbf24;">2 weeks away</strong> from our Kickstarter launch on <strong style="color: #fbbf24;">February 17, 2026</strong>!
                            </p>

                            <div style="background: rgba(251, 191, 36, 0.1); border: 2px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 30px 0;">
                                <h3 style="margin: 0 0 15px; color: #fbbf24; font-size: 20px;">🎁 Early Bird Reward Tiers Preview</h3>
                                <ul style="margin: 0; padding-left: 20px; color: #e5e7eb; font-size: 16px; line-height: 1.8;">
                                    <li><strong style="color: #fbbf24;">Early Bird:</strong> $75 (was $90) - First 100 backers only</li>
                                    <li><strong style="color: #fbbf24;">Standard:</strong> $90 - 2-Player Starter Bundle</li>
                                    <li><strong style="color: #fbbf24;">Collector:</strong> $150 - Deluxe Collection with signed prints</li>
                                </ul>
                            </div>

                            <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                                Early bird pricing is <strong style="color: #fbbf24;">limited to the first 100 backers</strong>, so make sure you're ready when we launch!
                            </p>

                            <!-- CTA Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <p style="margin: 0 0 15px; font-size: 16px; color: #e5e7eb; font-weight: bold;">Get ready for launch:</p>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 10px;">
                                                    <a href="https://www.kickstarter.com/projects/elemental-games/elekin" style="display: inline-block; background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%); color: #1A103C; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px; text-align: center;">
                                                        🔔 Notify Me on Kickstarter
                                                    </a>
                                                </td>
                                                <td style="padding: 0 10px;">
                                                    <a href="https://elementalgames.gg/shop" style="display: inline-block; background: linear-gradient(90deg, #7c3aed 0%, #5b21b6 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px; text-align: center;">
                                                        🛒 Shop Now
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="margin: 15px 0 0; font-size: 14px; color: #9ca3af; text-align: center;">
                                            <a href="https://elementalgames.gg/kickstarter" style="color: #fbbf24;">View full preview</a> | <a href="https://discord.gg/PVrgZBmcMq" style="color: #fbbf24;">Join Discord</a>
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
                                Next update: 1 week until launch!
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

