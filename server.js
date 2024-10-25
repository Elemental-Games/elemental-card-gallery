import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { Resend } from 'resend';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/subscribe', async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const { email } = req.body;
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return res.status(500).json({ message: 'Email service configuration error' });
    }
    
    const unsubscribeToken = Buffer.from(email).toString('base64');
    const unsubscribeUrl = `${process.env.SITE_URL}/unsubscribe?token=${unsubscribeToken}`;

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

          <h2 style="color: #7c3aed;">Coming Soon:</h2>
          <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 10px;">🎉 <strong>Kickstarter Launch:</strong> Mark your calendar for November 1st, 2024!</li>
            <li style="margin-bottom: 10px;">🎁 <strong>Early Bird Special:</strong> First 169 backers of $50+ will receive an autographed card of their choice.</li>
            <li style="margin-bottom: 10px;">🛍️ <strong>Official Marketplace:</strong> Direct card purchases and special weekly discounts.</li>
          </ul>

          <div style="text-align: center; margin-top: 30px;">
            <p>Follow us for the latest updates:</p>
            <p>
              <a href="https://discord.gg/qXNWh4dMve" style="color: #7c3aed; text-decoration: none; margin: 0 10px;">Discord</a> |
              <a href="https://x.com/elemental_tcg" style="color: #7c3aed; text-decoration: none; margin: 0 10px;">X (Twitter)</a>
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
    return res.status(200).json({ message: 'Successfully subscribed', emailResponse });

  } catch (error) {
    console.error('Detailed subscription error:', {
      message: error.message,
      stack: error.stack,
      details: error.details
    });
    return res.status(500).json({ 
      message: 'Error subscribing', 
      error: error.message,
      details: error.details 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));