export const getKickstarterWeek3EmailHTML = (email) => {
  const unsubscribeToken = Buffer.from(email).toString('base64');
  const unsubscribeUrl = `${process.env.SITE_URL || 'https://elementalgames.gg'}/unsubscribe?token=${unsubscribeToken}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3 Days Until Launch!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1A103C; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1A103C;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #2d1b69 0%, #4c1d95 100%); border-radius: 12px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #1A103C; font-size: 32px; font-weight: bold;">3 Days Until Launch! ⚡</h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px; color: #ffffff;">
                            <h2 style="margin: 0 0 20px; color: #fbbf24; font-size: 24px;">Almost There!</h2>
                            
                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                                Just <strong style="color: #fbbf24;">3 days</strong> until we launch on <strong style="color: #fbbf24;">February 17, 2026</strong>! Are you ready?
                            </p>

                            <div style="background: rgba(251, 191, 36, 0.1); border: 2px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 30px 0;">
                                <h3 style="margin: 0 0 15px; color: #fbbf24; font-size: 20px;">📋 How to Back on Launch Day</h3>
                                <ol style="margin: 0; padding-left: 20px; color: #e5e7eb; font-size: 16px; line-height: 1.8;">
                                    <li>Check your email on <strong style="color: #fbbf24;">February 17</strong> for the launch notification</li>
                                    <li>Click the direct link to our Kickstarter page</li>
                                    <li>Select your reward tier (Early Bird pricing available for first 48 hours!)</li>
                                    <li>Complete your pledge and join the community!</li>
                                </ol>
                            </div>

                            <div style="background: rgba(251, 191, 36, 0.1); border: 2px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 30px 0;">
                                <h3 style="margin: 0 0 15px; color: #fbbf24; font-size: 20px;">🎉 Launch Day Schedule</h3>
                                <ul style="margin: 0; padding-left: 20px; color: #e5e7eb; font-size: 16px; line-height: 1.8;">
                                    <li><strong style="color: #fbbf24;">12:00 PM EST:</strong> Campaign goes live</li>
                                    <li><strong style="color: #fbbf24;">12:00 PM EST:</strong> Launch email sent to all subscribers</li>
                                    <li><strong style="color: #fbbf24;">All Day:</strong> Discord launch party with live updates</li>
                                    <li><strong style="color: #fbbf24;">48 Hours:</strong> Early bird pricing window</li>
                                </ul>
                            </div>

                            <!-- CTA Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <p style="margin: 0 0 15px; font-size: 16px; color: #e5e7eb; font-weight: bold;">Final preparations - 3 days until launch:</p>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 10px;">
                                                    <a href="https://www.kickstarter.com/projects/elemental-games/elekin" style="display: inline-block; background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%); color: #1A103C; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px; text-align: center;">
                                                        🔔 Set Kickstarter Reminder
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
                                            See you on launch day! 🚀
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
                                Final update: Launch day email coming February 17!
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

