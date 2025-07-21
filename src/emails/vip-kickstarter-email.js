// VIP Early Access Kickstarter Email Template
// Send this email IMMEDIATELY to your 122 subscribers

export const vipEarlyAccessEmail = {
  subject: "🔥 VIP Early Access: Follow Our Kickstarter for Exclusive Rewards",
  
  // Alternative subject lines to test
  subjectAlternatives: [
    "🎯 You're getting VIP access before 50,000 other people",
    "⚡ Exclusive: Follow our Kickstarter before we announce it publicly",
    "🏰 VIP Early Access: Elemental Games Kickstarter (Only 122 people)"
  ],

  // HTML Email Template
  htmlTemplate: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VIP Early Access - Elemental Games</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            background: #f8fafc;
        }
        .container { 
            background: white; 
            padding: 40px; 
            border-radius: 12px; 
            margin: 20px; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px; 
        }
        .logo { 
            max-width: 200px; 
            height: auto; 
        }
        h1 { 
            color: #2563eb; 
            font-size: 28px; 
            margin-bottom: 10px; 
            text-align: center;
        }
        .vip-badge {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 20px;
        }
        .benefits {
            background: #f0f9ff;
            padding: 25px;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
            margin: 25px 0;
        }
        .benefit-item {
            display: flex;
            align-items: center;
            margin: 12px 0;
            font-size: 16px;
        }
        .checkmark {
            color: #10b981;
            font-weight: bold;
            margin-right: 10px;
            font-size: 18px;
        }
        .cta-button {
            display: block;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            text-decoration: none;
            padding: 18px 40px;
            border-radius: 50px;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            margin: 30px auto;
            max-width: 300px;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            transition: all 0.3s ease;
        }
        .cta-button:hover {
            background: linear-gradient(135deg, #1d4ed8, #1e40af);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
        .urgency {
            background: #fef2f2;
            border: 2px solid #f87171;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            text-align: center;
        }
        .urgency-text {
            color: #dc2626;
            font-weight: bold;
            font-size: 16px;
        }
        .exclusive {
            background: #f0fdf4;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #10b981;
            margin: 25px 0;
        }
        .signature {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
        }
        .ps {
            background: #fffbeb;
            padding: 15px;
            border-radius: 6px;
            border-left: 3px solid #fbbf24;
            margin-top: 20px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://elementalgames.gg/Games_Logo.png" alt="Elemental Games" class="logo">
        </div>
        
        <h1>🔥 You're Getting VIP Access Before Anyone Else</h1>
        
        <div style="text-align: center;">
            <span class="vip-badge">VIP SUBSCRIBER #{{SUBSCRIBER_NUMBER}}</span>
        </div>
        
        <p style="font-size: 18px; margin-bottom: 25px;">Hey {{FIRST_NAME}},</p>
        
        <p>You've been with us since the beginning, and <strong>I need your help</strong>.</p>
        
        <p>Our Kickstarter launches in <strong>{{DAYS_TO_LAUNCH}} days</strong>, and I'm giving <em>YOU</em> exclusive early access to follow it before we announce it publicly.</p>
        
        <div class="benefits">
            <h3 style="margin-top: 0; color: #2563eb;">🎁 FOLLOW NOW FOR VIP REWARDS:</h3>
            <div class="benefit-item">
                <span class="checkmark">✅</span>
                <span><strong>20% Early Bird Discount</strong> (VIP followers only)</span>
            </div>
            <div class="benefit-item">
                <span class="checkmark">✅</span>
                <span><strong>Exclusive VIP Backer Badge</strong></span>
            </div>
            <div class="benefit-item">
                <span class="checkmark">✅</span>
                <span><strong>First access to limited edition cards</strong></span>
            </div>
            <div class="benefit-item">
                <span class="checkmark">✅</span>
                <span><strong>Behind-the-scenes updates</strong></span>
            </div>
            <div class="benefit-item">
                <span class="checkmark">✅</span>
                <span><strong>Priority customer support</strong></span>
            </div>
        </div>
        
        <a href="{{KICKSTARTER_LINK}}?utm_source=email&utm_medium=vip&utm_campaign=early_access&utm_content=main_cta" class="cta-button">
            🚀 FOLLOW KICKSTARTER NOW
        </a>
        
        <div class="urgency">
            <p class="urgency-text">⏰ Why follow now? Because in 48 hours, we're announcing this to 50,000+ people and the VIP rewards disappear forever.</p>
        </div>
        
        <div class="exclusive">
            <p style="text-align: center; margin: 0; font-weight: bold; color: #059669;">
                You're one of only 122 people getting this email.
            </p>
        </div>
        
        <p style="font-size: 18px; text-align: center; margin: 30px 0;">
            <strong>Don't miss out.</strong>
        </p>
        
        <div class="signature">
            <p>Best regards,<br>
            <strong>Mark</strong><br>
            <em>Founder of Elemental Games</em></p>
            
            <div class="ps">
                <p><strong>P.S.</strong> It literally takes 5 seconds to follow, and you'll be first in line for everything. I've been working on this for years, and I want my most loyal supporters to get the best rewards. That's you! 🙏</p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>Questions? Just reply to this email - I read every response personally.</p>
            <p>{{UNSUBSCRIBE_LINK}}</p>
        </div>
    </div>
</body>
</html>`,

  // Plain text version for email clients that don't support HTML
  textTemplate: `
🔥 VIP Early Access: Follow Our Kickstarter for Exclusive Rewards

Hey {{FIRST_NAME}},

You've been with us since the beginning, and I need your help.

Our Kickstarter launches in {{DAYS_TO_LAUNCH}} days, and I'm giving YOU exclusive early access to follow it before we announce it publicly.

🎁 FOLLOW NOW FOR VIP REWARDS:
✅ 20% Early Bird Discount (VIP followers only)
✅ Exclusive VIP backer badge  
✅ First access to limited edition cards
✅ Behind-the-scenes updates
✅ Priority customer support

FOLLOW KICKSTARTER NOW: {{KICKSTARTER_LINK}}?utm_source=email&utm_medium=vip&utm_campaign=early_access&utm_content=text_cta

⏰ Why follow now? Because in 48 hours, we're announcing this to 50,000+ people and the VIP rewards disappear forever.

You're one of only 122 people getting this email.

Don't miss out.

Best regards,
Mark
Founder of Elemental Games

P.S. It literally takes 5 seconds to follow, and you'll be first in line for everything. I've been working on this for years, and I want my most loyal supporters to get the best rewards. That's you!

Questions? Just reply to this email - I read every response personally.

{{UNSUBSCRIBE_LINK}}
`,

  // Merge tags to replace in the template
  mergeTags: {
    'FIRST_NAME': 'subscriber.firstName || "Friend"',
    'SUBSCRIBER_NUMBER': 'Math.floor(Math.random() * 122) + 1', // Random number 1-122 for exclusivity
    'DAYS_TO_LAUNCH': '14', // Adjust based on your actual launch date
    'KICKSTARTER_LINK': 'YOUR_KICKSTARTER_FOLLOW_LINK', // Replace with actual KS link
    'UNSUBSCRIBE_LINK': 'YOUR_UNSUBSCRIBE_LINK'
  },

  // Follow-up email sequence (send these if they don't follow)
  followUpSequence: [
    {
      delay: 24, // hours
      subject: "⏰ 24 hours left for VIP access (122 exclusive invites)",
      shortMessage: "Just a quick reminder - you have 24 hours left to claim your VIP early bird rewards before we open this to the public..."
    },
    {
      delay: 46, // hours  
      subject: "🚨 Final 2 hours: VIP access ending soon",
      shortMessage: "This is it - VIP access ends in 2 hours. After that, you'll have to wait in line with everyone else..."
    }
  ],

  // Tracking URLs for analytics
  trackingParams: {
    utm_source: 'email',
    utm_medium: 'vip',
    utm_campaign: 'early_access',
    utm_content: 'main_cta'
  }
};

// Quick send function (if using a service like Resend, SendGrid, etc.)
export const sendVIPEmail = async (subscribers, kickstarterLink) => {
  // This is a template function - adapt to your email service
  const emailData = {
    from: 'Mark <mark@elementalgames.gg>',
    to: subscribers, // Array of email addresses
    subject: vipEarlyAccessEmail.subject,
    html: vipEarlyAccessEmail.htmlTemplate
      .replace('{{KICKSTARTER_LINK}}', kickstarterLink)
      .replace('{{DAYS_TO_LAUNCH}}', '14'), // Adjust as needed
    text: vipEarlyAccessEmail.textTemplate
      .replace('{{KICKSTARTER_LINK}}', kickstarterLink)
      .replace('{{DAYS_TO_LAUNCH}}', '14')
  };
  
  // Send email using your preferred service
  console.log('Email ready to send:', emailData);
  return emailData;
};

export default vipEarlyAccessEmail; 