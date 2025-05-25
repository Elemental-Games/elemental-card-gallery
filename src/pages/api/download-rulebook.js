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

    console.log('Attempting to send rulebook to:', email);

    // Create unsubscribe token
    const unsubscribeToken = Buffer.from(email).toString('base64');
    const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${unsubscribeToken}`;

    // Email content for the rulebook
    const rulebookEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f0729; color: #e5e7eb;">
        <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #7c3aed;">
          <h1 style="color: #fbbf24; font-size: 28px; margin: 0; text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);">
            Elekin: Masters of Kinbrold
          </h1>
          <p style="color: #a855f7; font-size: 16px; margin: 5px 0 0 0;">Complete Rulebook</p>
        </div>

        <div style="padding: 30px 0;">
          <h2 style="color: #fbbf24; font-size: 22px; margin-bottom: 15px;">📖 Your Complete Rulebook is Here!</h2>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for your interest in Elekin! We're excited to share the complete rulebook with you.
          </p>

          <div style="background-color: #1e1b4b; padding: 20px; border-radius: 8px; border-left: 4px solid #fbbf24; margin: 20px 0;">
            <h3 style="color: #fbbf24; margin: 0 0 10px 0;">What's Inside:</h3>
            <ul style="color: #e5e7eb; padding-left: 20px; margin: 0;">
              <li style="margin-bottom: 8px;">Complete game rules and mechanics</li>
              <li style="margin-bottom: 8px;">Card types and abilities guide</li>
              <li style="margin-bottom: 8px;">Strategy tips and deck building advice</li>
              <li style="margin-bottom: 8px;">Lore and world-building content</li>
              <li style="margin-bottom: 8px;">Tournament rules and formats</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://elementalgames.gg/elekin/rulebook" 
               style="background-color: #7c3aed; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);">
              📚 View Interactive Rulebook
            </a>
          </div>

          <div style="background-color: #422006; padding: 20px; border-radius: 8px; border: 2px solid #fbbf24; margin: 20px 0;">
            <h3 style="color: #fbbf24; margin: 0 0 15px 0; text-align: center;">🎮 Ready to Play?</h3>
            <p style="margin: 0 0 15px 0; text-align: center;">
              Join our community and be part of the Elekin journey!
            </p>
            <div style="text-align: center;">
              <a href="https://discord.gg/PVrgZBmcMq" style="color: #fbbf24; text-decoration: none; margin: 0 15px; font-weight: bold;">🎮 Discord</a>
              <a href="https://www.tiktok.com/@elekin_tcg" style="color: #fbbf24; text-decoration: none; margin: 0 15px; font-weight: bold;">📱 TikTok</a>
              <a href="https://www.instagram.com/elekin_tcg/" style="color: #fbbf24; text-decoration: none; margin: 0 15px; font-weight: bold;">📸 Instagram</a>
            </div>
          </div>

          <div style="background-color: #1e1b4b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #a855f7; margin: 0 0 15px 0;">🎉 Stay Connected!</h3>
            <p style="margin: 0 0 15px 0;">
              We've also added you to our mailing list so you'll receive:
            </p>
            <ul style="color: #e5e7eb; padding-left: 20px; margin: 0;">
              <li style="margin-bottom: 8px;">Exclusive card reveals</li>
              <li style="margin-bottom: 8px;">Strategy guides and tips</li>
              <li style="margin-bottom: 8px;">Tournament announcements</li>
              <li style="margin-bottom: 8px;">Early access to new content</li>
            </ul>
          </div>
        </div>

        <div style="text-align: center; padding: 20px 0; border-top: 1px solid #374151;">
          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            You received this email because you requested the Elekin rulebook.
            <br><br>
            <a href="${unsubscribeUrl}" style="color: #a855f7; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </div>
    `;

    // Send the rulebook email
    const emailResponse = await resend.emails.send({
      from: 'Elemental Masters <contact@elementalgames.gg>',
      to: email,
      subject: '📖 Your Elekin Rulebook is Ready!',
      html: rulebookEmailContent,
    });

    // Also trigger the welcome email through Supabase for new subscriber
    try {
      const response = await fetch(`${process.env.SUPABASE_URL}/functions/v1/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        console.log('Could not send welcome email through Supabase, but rulebook was sent successfully');
      }
    } catch (error) {
      console.log('Could not send welcome email through Supabase, but rulebook was sent successfully:', error.message);
    }

    console.log('Rulebook email sent successfully:', emailResponse);
    return res.status(200).json({ 
      message: 'Rulebook sent successfully! Check your email.',
      emailResponse
    });

  } catch (error) {
    console.error('Error sending rulebook:', error);
    
    return res.status(500).json({ 
      message: 'Error sending rulebook', 
      error: error.message
    });
  }
} 