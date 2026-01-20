const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function sendVipKickstarterEmail(isTest = false, testEmail = 'mark@elementalgames.gg') {
  try {
    console.log('🚨 Starting VIP Kickstarter Email Campaign...');
    
    // Get subscribers from Supabase
    let subscribers = [];
    
    if (isTest) {
      console.log(`📧 Test mode: Sending to ${testEmail}`);
      subscribers = [{ email: testEmail }];
    } else {
      console.log('📊 Fetching all subscribers from database...');
      const { data, error } = await supabase
        .from('subscribers')
        .select('email')
        .eq('subscribed', true);

      if (error) {
        console.error('❌ Error fetching subscribers:', error);
        throw error;
      }

      subscribers = data || [];
      console.log(`📈 Found ${subscribers.length} active subscribers`);
    }

    if (subscribers.length === 0) {
      throw new Error('No subscribers found');
    }

    // Prepare email data
    const emailData = {
      from: 'Elemental Games <mark@elementalgames.gg>',
      to: subscribers.map(sub => sub.email),
      subject: '🔥 VIP Early Access: Follow Our Kickstarter for Exclusive Rewards',
      html: getVipKickstarterEmailHTML(),
      text: getVipKickstarterEmailText(),
      headers: {
        'X-Campaign-Type': 'VIP-Kickstarter',
        'X-Priority': '1'
      }
    };

    console.log('🚀 Sending emails via Resend...');
    
    // Send email via Resend
    const result = await resend.emails.send(emailData);

    if (result.error) {
      console.error('❌ Resend error:', result.error);
      throw new Error(result.error.message);
    }

    console.log('✅ Email sent successfully!');
    console.log(`📧 Message ID: ${result.data?.id}`);
    console.log(`👥 Recipients: ${subscribers.length}`);
    
    if (!isTest) {
      console.log('\n🎯 VIP KICKSTARTER CAMPAIGN LAUNCHED! 🎯');
      console.log(`📊 Expected results: 30-50 new Kickstarter followers within 24 hours`);
      console.log(`📈 Conversion rate target: 25-40% of ${subscribers.length} subscribers`);
      console.log('\n📋 NEXT STEPS:');
      console.log('1. Monitor Kickstarter follower count hourly');
      console.log('2. Track email open/click rates in Resend dashboard');
      console.log('3. Prepare for increased website traffic');
      console.log('4. Watch for social media engagement spike');
    }

    return {
      success: true,
      messageId: result.data?.id,
      recipients: subscribers.length,
      message: isTest 
        ? `Test VIP email sent successfully to ${testEmail}` 
        : `🚨 CRITICAL: VIP Kickstarter campaign sent to ${subscribers.length} subscribers!`
    };

  } catch (error) {
    console.error('💥 VIP Kickstarter email error:', error);
    throw error;
  }
}

function getVipKickstarterEmailHTML() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VIP Early Access - Elekin TCG</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .vip-badge { background: #ff6b6b; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; display: inline-block; margin-bottom: 15px; }
        .cta-button { background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 18px; display: inline-block; margin: 20px 0; }
        .cta-button:hover { background: #218838; }
        .benefits { background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .benefit-item { display: flex; align-items: center; margin: 10px 0; }
        .benefit-icon { background: #28a745; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; font-size: 14px; }
        .urgency { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .content { padding: 30px; }
        @media (max-width: 600px) {
            .content { padding: 20px; }
            .cta-button { padding: 12px 25px; font-size: 16px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="vip-badge">🔥 VIP EXCLUSIVE</div>
            <h1 style="margin: 0; font-size: 28px;">Early Access Invitation</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">You're one of only 122 people getting this exclusive offer</p>
        </div>
        
        <div class="content">
            <h2 style="color: #333; margin-top: 0;">🚨 Follow Our Kickstarter NOW for VIP Rewards!</h2>
            
            <p>Hi VIP Subscriber,</p>
            
            <p>You're receiving this because you're part of our <strong>exclusive inner circle of 122 early supporters</strong>. Before we announce our Kickstarter to 50,000+ people, you get first access to incredible VIP rewards:</p>
            
            <div class="benefits">
                <div class="benefit-item">
                    <div class="benefit-icon">💰</div>
                    <div><strong>20% Early Bird Discount</strong> - VIP followers only</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">🏆</div>
                    <div><strong>Exclusive VIP Backer Badge</strong> - Show your VIP status</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">🎯</div>
                    <div><strong>First Access to Limited Editions</strong> - Get rare cards first</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">📰</div>
                    <div><strong>Behind-the-Scenes Updates</strong> - VIP development insights</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-icon">⚡</div>
                    <div><strong>Priority Customer Support</strong> - Skip the line</div>
                </div>
            </div>
            
            <div style="text-align: center;">
                <a href="https://www.kickstarter.com/projects/elemental-games/elekin?utm_source=vip_email&utm_medium=email&utm_campaign=early_access" class="cta-button">
                    🚀 FOLLOW KICKSTARTER NOW
                </a>
            </div>
            
            <div class="urgency">
                <strong>⏰ Time Sensitive:</strong> These VIP rewards are only available to followers who join before our public announcement. Once we hit 500 followers, these exclusive benefits end forever.
            </div>
            
            <p><strong>Why follow now?</strong></p>
            <ul style="padding-left: 20px;">
                <li>You'll be notified the moment we launch</li>
                <li>Lock in your 20% VIP discount</li>
                <li>Help us reach your initial goal faster</li>
                <li>Join an exclusive community of early believers</li>
            </ul>
            
            <p>Thank you for being part of our journey from the beginning. Your early support makes all the difference.</p>
            
            <p><strong>Ready to claim your VIP rewards?</strong></p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://www.kickstarter.com/projects/elemental-games/elekin?utm_source=vip_email&utm_medium=email&utm_campaign=early_access" class="cta-button">
                    👑 FOLLOW & CLAIM VIP STATUS
                </a>
            </div>
            
            <p>Best regards,<br>
            <strong>Mark DiOrio</strong><br>
            Creator, Elekin TCG</p>
        </div>
        
        <div class="footer">
            <p>© 2024 Elemental Games. All rights reserved.</p>
            <p>You're receiving this because you're a valued subscriber.</p>
        </div>
    </div>
</body>
</html>`;
}

function getVipKickstarterEmailText() {
  return `
🔥 VIP EXCLUSIVE - Early Access Invitation

Hi VIP Subscriber,

You're one of only 122 people getting this exclusive offer!

🚨 Follow Our Kickstarter NOW for VIP Rewards!

Before we announce our Kickstarter to 50,000+ people, you get first access to incredible VIP rewards:

💰 20% Early Bird Discount (VIP followers only)
🏆 Exclusive VIP Backer Badge
🎯 First Access to Limited Editions
📰 Behind-the-Scenes Updates
⚡ Priority Customer Support

⏰ TIME SENSITIVE: These VIP rewards are only available to followers who join before our public announcement. Once we hit 500 followers, these exclusive benefits end forever.

FOLLOW KICKSTARTER NOW:
https://www.kickstarter.com/projects/elemental-games/elekin?utm_source=vip_email&utm_medium=email&utm_campaign=early_access

Why follow now?
- You'll be notified the moment we launch
- Lock in your 20% VIP discount
- Help us reach our initial goal faster
- Join an exclusive community of early believers

Thank you for being part of our journey from the beginning.

Best regards,
Mark DiOrio
Creator, Elekin TCG

© 2024 Elemental Games. All rights reserved.
`;
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const isTest = args.includes('--test');
  const testEmail = args.find(arg => arg.includes('@')) || 'mark@elementalgames.gg';

  sendVipKickstarterEmail(isTest, testEmail)
    .then(() => {
      console.log('\n🎉 Campaign completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Campaign failed:', error.message);
      process.exit(1);
    });
}

module.exports = { sendVipKickstarterEmail }; 