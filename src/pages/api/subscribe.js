import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set in environment variables');
    return res.status(500).json({ 
      message: 'Email service configuration error',
      debug: { resendApiKeyExists: false }
    });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    console.log('Attempting to send email to:', email);
    console.log('Using SITE_URL:', SITE_URL);

    const unsubscribeToken = Buffer.from(email).toString('base64');
    const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${unsubscribeToken}`;

    const emailResponse = await resend.emails.send({
      from: 'Elemental Masters <contact@elementalgames.gg>',
      to: email,
      subject: 'Welcome to the World of Elemental Masters!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #6d28d9; text-align: center;">Welcome to Elemental Masters!</h1>
          
          <p>Thank you for joining our community! We're excited to have you on this journey with us.</p>
          
          <h2 style="color: #7c3aed;">What Makes Elemental Masters Special:</h2>
          <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 10px;">🎮 <strong>Interactive Card Technology:</strong> Every card features a unique QR code that unlocks lore, strategies, and more!</li>
            <li style="margin-bottom: 10px;">🌍 <strong>Rich World:</strong> Explore 5 unique kingdoms and 6 connecting regions in the world of Kinbrold.</li>
            <li style="margin-bottom: 10px;">🐉 <strong>Diverse Creatures:</strong> Command creatures of Air, Water, Fire, and Earth, plus exotic combinational elements!</li>
            <li style="margin-bottom: 10px;">⚔️ <strong>Unique Battle System:</strong> Experience our innovative shield system and strategic combat mechanics.</li>
            <li style="margin-bottom: 10px;">⏱️ <strong>Quick Yet Strategic:</strong> Games last around 20 minutes, perfect for both casual and competitive play.</li>
          </ul>

          <h2 style="color: #7c3aed;">We're Live on Kickstarter!</h2>
          <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 10px;">🎉 <strong>Kickstarter is live!</strong> Back us now to help fund Elekin's first set.</li>
            <li style="margin-bottom: 10px;">🎁 <strong>Backer Bonus:</strong> Every backer receives an alt art promo card.</li>
            <li style="margin-bottom: 10px;">🚀 <strong>Stretch Goals:</strong> The more we raise, the more free items every backer unlocks!</li>
          </ul>
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://www.kickstarter.com/projects/elemental-games/elekin" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Back on Kickstarter →</a>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p>Follow us for the latest updates:</p>
            <p>
              <a href="https://discord.gg/qXNWh4dMve" style="color: #7c3aed; text-decoration: none; margin: 0 10px;">Discord</a> |
              <a href="https://www.tiktok.com/@elekin_tcg" style="color: #7c3aed; text-decoration: none; margin: 0 10px;">TikTok</a>
            </p>
          </div>

          <p style="font-size: 12px; color: #666; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            You received this email because you signed up for updates about Elemental Masters.
            <br><br>
            <a href="${unsubscribeUrl}" style="color: #7c3aed; text-decoration: none;">Click here to unsubscribe</a>
          </p>
        </div>
      `,
    });

    console.log('Email sent successfully:', emailResponse);
    return res.status(200).json({ 
      message: 'Successfully subscribed', 
      emailResponse,
      debug: {
        siteUrl: SITE_URL,
        unsubscribeUrl,
        emailSent: true
      }
    });

  } catch (error) {
    console.error('Detailed subscription error:', {
      message: error.message,
      stack: error.stack,
      details: error.details,
      resendApiKeyExists: !!RESEND_API_KEY,
      siteUrlExists: !!SITE_URL
    });
    
    return res.status(500).json({ 
      message: 'Error subscribing', 
      error: error.message,
      details: error.details,
      debug: {
        siteUrl: SITE_URL,
        resendApiKeyExists: !!RESEND_API_KEY
      }
    });
  }
}