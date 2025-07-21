import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email sending service using Resend
export class ResendEmailService {
  constructor() {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }
  }

  // Send VIP Kickstarter email to subscribers
  async sendVipKickstarterEmail(subscribers, isTest = false) {
    try {
      const recipients = isTest ? ['mark@elementalgames.gg'] : subscribers.map(sub => sub.email);
      
      const emailData = {
        from: 'Elemental Games <mark@elementalgames.gg>',
        to: recipients,
        subject: '🔥 VIP Early Access: Follow Our Kickstarter for Exclusive Rewards',
        html: this.getVipKickstarterEmailHTML(),
        text: this.getVipKickstarterEmailText(),
        headers: {
          'X-Campaign-Type': 'VIP-Kickstarter',
          'X-Priority': '1'
        }
      };

      const result = await resend.emails.send(emailData);
      
      return {
        success: true,
        messageId: result.data?.id,
        recipients: recipients.length,
        message: isTest 
          ? `Test VIP email sent successfully to ${recipients[0]}` 
          : `VIP Kickstarter campaign sent to ${recipients.length} subscribers`
      };
    } catch (error) {
      console.error('VIP Kickstarter email error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to send VIP Kickstarter email'
      };
    }
  }

  // Send Discord Giveaway email
  async sendDiscordGiveawayEmail(subscribers, isTest = false) {
    try {
      const recipients = isTest ? ['mark@elementalgames.gg'] : subscribers.map(sub => sub.email);
      
      const emailData = {
        from: 'Elemental Games <mark@elementalgames.gg>',
        to: recipients,
        subject: '🎁 FIRST Discord Giveaway at 12PM EST - Join Now!',
        html: this.getDiscordGiveawayEmailHTML(),
        text: this.getDiscordGiveawayEmailText(),
        headers: {
          'X-Campaign-Type': 'Discord-Giveaway'
        }
      };

      const result = await resend.emails.send(emailData);
      
      return {
        success: true,
        messageId: result.data?.id,
        recipients: recipients.length,
        message: isTest 
          ? `Test Discord giveaway email sent to ${recipients[0]}` 
          : `Discord giveaway campaign sent to ${recipients.length} subscribers`
      };
    } catch (error) {
      console.error('Discord giveaway email error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to send Discord giveaway email'
      };
    }
  }

  // Send Kingdom email (Air, Evermere, Scarto)
  async sendKingdomEmail(kingdom, subscribers, isTest = false) {
    try {
      const recipients = isTest ? ['mark@elementalgames.gg'] : subscribers.map(sub => sub.email);
      
      const kingdomData = this.getKingdomEmailData(kingdom);
      
      const emailData = {
        from: 'Elemental Games <mark@elementalgames.gg>',
        to: recipients,
        subject: kingdomData.subject,
        html: kingdomData.html,
        text: kingdomData.text,
        headers: {
          'X-Campaign-Type': `Kingdom-${kingdom}`
        }
      };

      const result = await resend.emails.send(emailData);
      
      return {
        success: true,
        messageId: result.data?.id,
        recipients: recipients.length,
        message: isTest 
          ? `Test ${kingdom} email sent to ${recipients[0]}` 
          : `${kingdom} kingdom campaign sent to ${recipients.length} subscribers`
      };
    } catch (error) {
      console.error(`${kingdom} kingdom email error:`, error);
      return {
        success: false,
        error: error.message,
        message: `Failed to send ${kingdom} kingdom email`
      };
    }
  }

  // Get VIP Kickstarter email HTML
  getVipKickstarterEmailHTML() {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VIP Early Access - Elekin TCG</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #374151; 
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
            max-width: 320px; 
            height: auto; 
            display: block;
            margin: 0 auto;
        }
        h1 { 
            color: #1f2937; 
            font-size: 28px; 
            font-weight: 900; 
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
            border-left: 4px solid rgb(37, 235, 159);
            margin: 25px 0;
        }
        .benefit-item {
            display: flex;
            align-items: center;
            margin: 12px 0;
            font-size: 16px;
            color: #111827;
        }
        .checkmark {
            color: #10b981;
            font-weight: bold;
            margin-right: 10px;
            font-size: 18px;
        }
        .cta-button {
            display: block;
            background: linear-gradient(135deg,rgb(37, 235, 162),rgb(12, 136, 74));
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
            background: linear-gradient(135deg,rgb(29, 216, 91),rgb(25, 159, 112));
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
        .urgency {
            background: rgb(99, 232, 114);
            border: 2px solid rgb(18, 204, 27);
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            text-align: center;
        }
        .urgency-text {
            color: #111827;
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
            <img src="https://elementalgames.gg/Elekin.png" alt="Elekin TCG" class="logo">
        </div>
        
        <h1>✨ Follow Our Kickstarter to Help Support Us ✨</h1>
        
        <p style="font-size: 18px; margin-bottom: 25px; color: #111827; font-weight: 600;">Thank you for subscribing to our newsletter already!</p>
        
        <p style="font-size: 18px; margin-bottom: 25px; color: #111827;">We just released our Pre-Launch Kickstarter page, and we'd love for you to support us over on Kickstarter too.</p>
        
        <p style="font-size: 18px; margin-bottom: 25px; color: #111827;">Our Kickstarter launches in <strong>14 days</strong>, and as one of our most loyal supporters, you get to follow it before anyone else knows it exists.</p>
        
        <a href="https://www.kickstarter.com/projects/markdiorio/elekin-tcg?utm_source=email&utm_medium=vip&utm_campaign=early_access&utm_content=main_cta" class="cta-button">
            🚀 FOLLOW KICKSTARTER NOW
        </a>
        
        <div class="exclusive">
            <p style="text-align: center; margin: 0; font-weight: bold; color: #111827;">
                You're one of only 122 people getting this email.
            </p>
        </div>
        
        <p style="font-size: 18px; text-align: center; margin: 30px 0; color: #111827;">
            <strong>Ready to be part of something special?</strong>
        </p>
        
        <div class="signature">
            <p style="color: #111827;">Best regards,<br>
            <strong>Mark Diorio</strong><br>
            <em>Founder & Lead Developer of Elekin</em></p>
            
            <div class="ps">
                <p style="color: #111827;"><strong>P.S.</strong> Following takes just one click, and you'll be among the first to support what we've been building together. Thank you for being part of this journey! 🙏</p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #111827; font-size: 14px; margin-bottom: 10px;">Questions? Just reply to this email - I read every response personally.</p>
            <p style="font-size: 12px; margin: 0;">
                <a href="https://elementalgames.gg/unsubscribe" style="color: #6b7280; text-decoration: none;">unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>`;
  }

  // Get VIP Kickstarter email text version
  getVipKickstarterEmailText() {
    return `
✨ Follow Our Kickstarter to Help Support Us ✨

Thank you for subscribing to our newsletter already!

We just released our Pre-Launch Kickstarter page, and we'd love for you to support us over on Kickstarter too.

Our Kickstarter launches in 14 days, and as one of our most loyal supporters, you get to follow it before anyone else knows it exists.

🚀 FOLLOW KICKSTARTER NOW
[Your Kickstarter Link Here]

You're one of only 122 people getting this email.

Ready to be part of something special?

Best regards,
Mark Diorio
Founder & Lead Developer of Elekin

P.S. Following takes just one click, and you'll be among the first to support what we've been building together. Thank you for being part of this journey! 🙏

Questions? Just reply to this email - I read every response personally.

Unsubscribe: [Unsubscribe Link]
`;
  }

  // Get Discord Giveaway email HTML (simplified for now)
  getDiscordGiveawayEmailHTML() {
    return `
<!DOCTYPE html>
<html>
<head><title>Discord Giveaway - Elekin TCG</title></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1>🎁 First Ever Discord Giveaway!</h1>
    <p>Join our Discord community for exclusive prizes and early access to Elekin TCG content.</p>
    <p><a href="https://discord.gg/your-discord" style="background: #5865F2; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px;">Join Discord Now</a></p>
</body>
</html>`;
  }

  getDiscordGiveawayEmailText() {
    return "🎁 First Ever Discord Giveaway!\n\nJoin our Discord community for exclusive prizes.\n\nJoin Discord: https://discord.gg/your-discord";
  }

  // Get kingdom email data
  getKingdomEmailData(kingdom) {
    const kingdomInfo = {
      'air-kingdom': {
        subject: 'Zalos, The Air Kingdom, Rises 💨',
        html: '<h1>Air Kingdom Email</h1><p>The Air Kingdom awakens...</p>',
        text: 'Air Kingdom Email\n\nThe Air Kingdom awakens...'
      },
      'evermere': {
        subject: 'Evermere, The Central Kingdom, Awakens 🏰',
        html: '<h1>Evermere Kingdom Email</h1><p>The Central Kingdom unveils its secrets...</p>',
        text: 'Evermere Kingdom Email\n\nThe Central Kingdom unveils its secrets...'
      },
      'scarto': {
        subject: 'Scarto, The Fire Kingdom, Ignites 🔥',
        html: '<h1>Scarto Kingdom Email</h1><p>The Fire Kingdom ignites...</p>',
        text: 'Scarto Kingdom Email\n\nThe Fire Kingdom ignites...'
      }
    };

    return kingdomInfo[kingdom] || kingdomInfo['air-kingdom'];
  }
}

export default ResendEmailService; 