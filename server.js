import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { supabase } from './server-supabase.js';

dotenv.config();

const app = express();
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const isProd = process.env.NODE_ENV === 'production';

// CORS configuration based on environment
const corsOptions = {
  origin: isProd 
    ? ['https://elementalgames.gg', 'https://www.elementalgames.gg']
    : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://localhost:8081', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/subscribe', async (req, res) => {
  console.log('Subscribe endpoint hit with:', req.body);
  
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { email } = req.body;

    const data = await resend.emails.send({
      from: 'Elemental Masters <contact@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Masters!',
      html: `<p>Welcome to Elemental Masters!</p>`
    });

    console.log('Email sent:', data);
    res.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Error subscribing', error: error.message });
  }
});

app.post('/api/download-rulebook', async (req, res) => {
  console.log('Download rulebook endpoint hit with:', req.body);
  
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { email } = req.body;

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
    res.json({ 
      message: 'Rulebook sent successfully! Check your email.',
      emailResponse
    });

  } catch (error) {
    console.error('Error sending rulebook:', error);
    res.status(500).json({ 
      message: 'Error sending rulebook', 
      error: error.message
    });
  }
});

app.post('/api/send-marketing-email', async (req, res) => {
  console.log('Marketing email endpoint hit with:', req.body);
  
  const { email, testEmail = false, sendToAll = false } = req.body;
  
  if (!sendToAll && !email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    console.log('API Key status:', RESEND_API_KEY ? `Found (${RESEND_API_KEY.substring(0, 8)}...)` : 'Missing');
    const resend = new Resend(RESEND_API_KEY);

    // If sending to all subscribers, fetch from database
    if (sendToAll) {
      console.log('Fetching all active subscribers from database...');
      
      try {
        // Fetch all active subscribers from Supabase
        const { data: subscribers, error } = await supabase
          .from('subscribers')
          .select('email')
          .eq('status', 'active');

        if (error) {
          console.error('Error fetching subscribers:', error);
          return res.status(500).json({ 
            error: 'Failed to fetch subscribers',
            details: error.message 
          });
        }

        if (!subscribers || subscribers.length === 0) {
          return res.json({ 
            message: 'No active subscribers found',
            debug: {
              sendToAll: true,
              subscriberCount: 0
            }
          });
        }

        console.log(`Found ${subscribers.length} active subscribers`);

        // HTML version of the Air Kingdom email (for batch sending)
        const airKingdomEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Air Kingdom Rises</title>
    <style>
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
        }
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .content {
                padding: 20px !important;
            }
            .hero-text {
                font-size: 28px !important;
            }
            .hero-subtext {
                font-size: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Email Header -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); color: #ffffff; padding: 20px; text-align: center;">
                            <img src="https://elementalgames.gg/Elekin_Kinbrold_Icon.png" alt="Elekin Kinbrold" style="height: 60px; margin-bottom: 10px;">
                            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Weekly Kingdom Reveal</p>
                        </td>
                    </tr>

                    <!-- Hero Section -->
                    <tr>
                        <td style="position: relative;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="background-image: url('https://elementalgames.gg/images/kingdom-headers/zalos-header.webp'); background-size: cover; background-position: center; height: 320px; position: relative;">
                                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);"></div>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="height: 320px;">
                                            <tr>
                                                <td align="center" valign="middle" style="position: relative; z-index: 2; color: #ffffff; text-align: center; padding: 20px;">
                                                    <h2 class="hero-text" style="margin: 0 0 10px; font-size: 36px; font-weight: bold; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); -webkit-text-stroke: 1px rgba(255,255,255,0.3);">
                                                        MASTER THE WINDS.
                                                    </h2>
                                                    <h3 class="hero-subtext" style="margin: 0 0 15px; font-size: 26px; font-weight: bold; letter-spacing: 1px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); -webkit-text-stroke: 1px rgba(255,255,255,0.3);">
                                                        RULE THE BATTLEFIELD.
                                                    </h3>
                                                    <p style="margin: 0; font-size: 18px; opacity: 0.9; max-width: 400px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); -webkit-text-stroke: 0.5px rgba(255,255,255,0.2);">
                                                        Galea's domain opens its gates. Three air creatures await their reveal.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td class="content" style="padding: 40px;">
                            
                            <!-- Welcome Message -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: center; margin-bottom: 30px;">
                                        <h3 style="margin: 0 0 15px; color: #2563eb; font-size: 28px; font-weight: bold;">
                                            The Air Kingdom Rises 💨
                                        </h3>
                                        <p style="margin: 0; color: #374151; font-size: 18px; line-height: 1.6;">
                                            High above the clouds, where wind meets wisdom, Galea's floating kingdom 
                                            awaits your command. This week, three legendary air creatures join the battle.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Galea Spotlight -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td style="width: 200px; vertical-align: top;">
                                        <img src="https://elementalgames.gg/images/cards/new-marketing/galea-t.webp" 
                                             alt="Galea, Air Elementalist"
                                             style="width: 200px; height: auto; display: block;">
                                    </td>
                                    <td style="padding: 30px; vertical-align: top;">
                                        <h4 style="margin: 0 0 15px; color: #2563eb; font-size: 24px; font-weight: bold;">
                                            Meet Galea, Air Elementalist
                                        </h4>
                                        <p style="margin: 0 0 20px; color: #374151; line-height: 1.6;">
                                            Master of the floating kingdom, Galea commands the very winds themselves. 
                                            Her tactical brilliance and elemental mastery make her a formidable ally 
                                            in any battle.
                                        </p>
                                        <div style="background-color: #eff6ff; padding: 15px; border-radius: 6px;">
                                            <p style="margin: 0 0 8px; color: #1e40af; font-size: 14px; font-weight: 600;">
                                                💨 Elemental Mastery: Control air currents and wind pressure
                                            </p>
                                            <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                                                🏰 Kingdom Power: Command floating citadels and sky fortresses
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Card Showcase -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0;">
                                <tr>
                                    <td>
                                        <h4 style="margin: 0 0 30px; color: #1f2937; font-size: 24px; font-weight: bold; text-align: center;">
                                            New Air Creatures This Week
                                        </h4>

                                        <!-- Swoop Card -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            <tr>
                                                <td style="width: 200px; vertical-align: top;">
                                                    <img src="https://elementalgames.gg/images/cards/new-marketing/swoop-r.webp" 
                                                         alt="Swoop"
                                                         style="width: 200px; height: auto; display: block;">
                                                </td>
                                                <td style="padding: 30px; vertical-align: middle;">
                                                    <h5 style="margin: 0 0 10px; color: #2563eb; font-size: 28px; font-weight: bold;">Swoop</h5>
                                                    <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px; font-style: italic;">Swift aerial predator</p>
                                                    <div style="background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 15px; border-radius: 6px;">
                                                        <p style="margin: 0 0 5px; font-weight: 600;">📅 Release Date:</p>
                                                        <p style="margin: 0; font-size: 16px; font-weight: bold;">July 1st, 2025</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Dumoles Card -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            <tr>
                                                <td style="width: 200px; vertical-align: top;">
                                                    <img src="https://elementalgames.gg/images/cards/new-marketing/dumoles-r.webp" 
                                                         alt="Dumoles"
                                                         style="width: 200px; height: auto; display: block;">
                                                </td>
                                                <td style="padding: 30px; vertical-align: middle;">
                                                    <h5 style="margin: 0 0 10px; color: #2563eb; font-size: 28px; font-weight: bold;">Dumoles</h5>
                                                    <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px; font-style: italic;">Tactical air support</p>
                                                    <div style="background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 15px; border-radius: 6px;">
                                                        <p style="margin: 0 0 5px; font-weight: 600;">📅 Release Date:</p>
                                                        <p style="margin: 0; font-size: 16px; font-weight: bold;">July 2nd, 2025</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Nimbus Card -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            <tr>
                                                <td style="width: 200px; vertical-align: top;">
                                                    <img src="https://elementalgames.gg/images/cards/new-marketing/nimbus-r.webp" 
                                                         alt="Nimbus"
                                                         style="width: 200px; height: auto; display: block;">
                                                </td>
                                                <td style="padding: 30px; vertical-align: middle;">
                                                    <h5 style="margin: 0 0 10px; color: #2563eb; font-size: 28px; font-weight: bold;">Nimbus</h5>
                                                    <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px; font-style: italic;">Master of the winds</p>
                                                    <div style="background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 15px; border-radius: 6px;">
                                                        <p style="margin: 0 0 5px; font-weight: 600;">📅 Release Date:</p>
                                                        <p style="margin: 0; font-size: 16px; font-weight: bold;">July 3rd, 2025</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Weekly Giveaway Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0; background: linear-gradient(90deg, #fef3c7 0%, #fed7aa 100%); border: 2px solid #f59e0b; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <h4 style="margin: 0 0 20px; color: #ea580c; font-size: 24px; font-weight: bold;">
                                            🎁 Weekly Giveaway - Air Kingdom Edition
                                        </h4>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 50%; padding: 10px; vertical-align: top;">
                                                    <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #fbbf24; min-height: 100px; display: flex; flex-direction: column; justify-content: center;">
                                                        <div style="font-size: 24px; margin-bottom: 8px; text-align: center;">🏆</div>
                                                        <h5 style="margin: 0 0 8px; color: #1f2937; font-size: 14px; font-weight: bold; text-align: center;">Grand Prize</h5>
                                                        <p style="margin: 0; color: #4b5563; font-size: 12px; text-align: center; line-height: 1.3;">
                                                            1 lucky subscriber wins an <strong>exclusive Galea promo card</strong> post-launch!
                                                        </p>
                                                    </div>
                                                </td>
                                                <td style="width: 50%; padding: 10px; vertical-align: top;">
                                                    <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #fbbf24; min-height: 100px; display: flex; flex-direction: column; justify-content: center;">
                                                        <div style="font-size: 24px; margin-bottom: 8px; text-align: center;">🎪</div>
                                                        <h5 style="margin: 0 0 8px; color: #1f2937; font-size: 14px; font-weight: bold; text-align: center;">Runner-Up Prizes</h5>
                                                        <p style="margin: 0; color: #4b5563; font-size: 12px; text-align: center; line-height: 1.3;">
                                                            2 lucky subscribers win <strong>free booster packs</strong> post-launch!
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <div style="background-color: #2563eb; color: #ffffff; padding: 20px; border-radius: 6px; margin-top: 20px;">
                                            <p style="margin: 0 0 10px; font-weight: 600;">How to Enter:</p>
                                            <p style="margin: 0; font-size: 14px;">
                                                Join our Discord and follow us on social media to participate in all giveaways!
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Call to Action -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 15px 30px; background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); border-radius: 6px;">
                                                    <a href="https://elementalgames.gg/kinbrold/zalos" 
                                                       style="color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 600; display: block;">
                                                        Explore the Air Kingdom
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 20px auto 0;">
                                            <tr>
                                                <td style="padding: 0 10px;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="padding: 12px 24px; border: 1px solid #2563eb; border-radius: 6px;">
                                                                <a href="https://elementalgames.gg/cards/campaign" 
                                                                   style="color: #2563eb; text-decoration: none; font-size: 14px; font-weight: 600;">
                                                                    View All Cards
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="padding: 0 10px;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="padding: 12px 24px; border: 1px solid #7c3aed; border-radius: 6px;">
                                                                <a href="https://discord.gg/PVrgZBmcMq" 
                                                                   style="color: #7c3aed; text-decoration: none; font-size: 14px; font-weight: 600;">
                                                                    Join Discord
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Social Links -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="text-align: center;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 15px;">
                                                    <a href="https://discord.gg/PVrgZBmcMq" style="color: #6b7280; text-decoration: none; font-size: 14px;">Discord</a>
                                                </td>
                                                <td style="padding: 0 15px;">
                                                    <a href="https://x.com/elekin_tcg" style="color: #6b7280; text-decoration: none; font-size: 14px;">Twitter</a>
                                                </td>
                                                <td style="padding: 0 15px;">
                                                    <a href="https://www.instagram.com/elekin_tcg/" style="color: #6b7280; text-decoration: none; font-size: 14px;">Instagram</a>
                                                </td>
                                                <td style="padding: 0 15px;">
                                                    <a href="https://www.tiktok.com/@elekin_tcg" style="color: #6b7280; text-decoration: none; font-size: 14px;">TikTok</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer with dynamic unsubscribe link -->
                    <tr>
                        <td style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
                            <p style="margin: 0 0 10px;">Next week: The Fire Kingdom of Scarto awaits...</p>
                            <p style="margin: 0 0 10px;">You received this email because you subscribed to Elekin TCG updates.</p>
                            <a href="https://elementalgames.gg/unsubscribe?email=SUBSCRIBER_EMAIL" style="color: #2563eb; text-decoration: underline;">Unsubscribe</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

        // Send emails to all active subscribers (in batches to avoid rate limits)
        const batchSize = 10; // Adjust based on your email service limits
        const emailPromises = [];
        
        for (let i = 0; i < subscribers.length; i += batchSize) {
          const batch = subscribers.slice(i, i + batchSize);
          
          const batchPromises = batch.map(async (subscriber) => {
            try {
              // Customize email content for each subscriber
              const personalizedHTML = airKingdomEmailHTML.replace(
                'SUBSCRIBER_EMAIL', 
                encodeURIComponent(subscriber.email)
              );

              const emailResponse = await resend.emails.send({
                from: 'Elemental Games <noreply@elementalgames.gg>',
                to: subscriber.email,
                subject: 'Zalos, The Air Kingdom, Rises 💨',
                html: personalizedHTML,
              });
              
              return { 
                email: subscriber.email, 
                success: true, 
                response: emailResponse 
              };
            } catch (error) {
              console.error(`Failed to send to ${subscriber.email}:`, error);
              return { 
                email: subscriber.email, 
                success: false, 
                error: error.message 
              };
            }
          });
          
          emailPromises.push(...batchPromises);
          
          // Add delay between batches to respect rate limits
          if (i + batchSize < subscribers.length) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
          }
        }

        const results = await Promise.all(emailPromises);
        const successCount = results.filter(r => r.success).length;
        const failureCount = results.filter(r => !r.success).length;

        console.log(`Email campaign completed: ${successCount} successful, ${failureCount} failed`);

        return res.json({ 
          message: `Air Kingdom email campaign sent to ${successCount} subscribers`,
          debug: {
            sendToAll: true,
            subscriberCount: subscribers.length,
            successCount,
            failureCount,
            results: results
          }
        });

      } catch (error) {
        console.error('Error in subscriber campaign:', error);
        return res.status(500).json({ 
          error: 'Failed to send campaign emails',
          details: error.message 
        });
      }
    }

    console.log('Sending Air Kingdom email to:', email);

    // HTML version of the Air Kingdom email (for single sends)
    const airKingdomEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Air Kingdom Rises</title>
    <style>
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
        }
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .content {
                padding: 20px !important;
            }
            .hero-text {
                font-size: 28px !important;
            }
            .hero-subtext {
                font-size: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Email Header -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); color: #ffffff; padding: 20px; text-align: center;">
                            <img src="https://elementalgames.gg/Elekin_Kinbrold_Icon.png" alt="Elekin Kinbrold" style="height: 60px; margin-bottom: 10px;">
                            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Weekly Kingdom Reveal</p>
                        </td>
                    </tr>

                    <!-- Hero Section -->
                    <tr>
                        <td style="position: relative;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="background-image: url('https://elementalgames.gg/images/kingdom-headers/zalos-header.webp'); background-size: cover; background-position: center; height: 320px; position: relative;">
                                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);"></div>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="height: 320px;">
                                            <tr>
                                                <td align="center" valign="middle" style="position: relative; z-index: 2; color: #ffffff; text-align: center; padding: 20px;">
                                                    <h2 class="hero-text" style="margin: 0 0 10px; font-size: 36px; font-weight: bold; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); -webkit-text-stroke: 1px rgba(255,255,255,0.3);">
                                                        MASTER THE WINDS.
                                                    </h2>
                                                    <h3 class="hero-subtext" style="margin: 0 0 15px; font-size: 26px; font-weight: bold; letter-spacing: 1px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); -webkit-text-stroke: 1px rgba(255,255,255,0.3);">
                                                        RULE THE BATTLEFIELD.
                                                    </h3>
                                                    <p style="margin: 0; font-size: 18px; opacity: 0.9; max-width: 400px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); -webkit-text-stroke: 0.5px rgba(255,255,255,0.2);">
                                                        Galea's domain opens its gates. Three air creatures await their reveal.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td class="content" style="padding: 40px;">
                            
                            <!-- Welcome Message -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: center; margin-bottom: 30px;">
                                        <h3 style="margin: 0 0 15px; color: #2563eb; font-size: 28px; font-weight: bold;">
                                            The Air Kingdom Rises 💨
                                        </h3>
                                        <p style="margin: 0; color: #374151; font-size: 18px; line-height: 1.6;">
                                            High above the clouds, where wind meets wisdom, Galea's floating kingdom 
                                            awaits your command. This week, three legendary air creatures join the battle.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Galea Spotlight -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td style="width: 200px; vertical-align: top;">
                                        <img src="https://elementalgames.gg/images/cards/new-marketing/galea-t.webp" 
                                             alt="Galea, Air Elementalist"
                                             style="width: 200px; height: auto; display: block;">
                                    </td>
                                    <td style="padding: 30px; vertical-align: top;">
                                        <h4 style="margin: 0 0 15px; color: #2563eb; font-size: 24px; font-weight: bold;">
                                            Meet Galea, Air Elementalist
                                        </h4>
                                        <p style="margin: 0 0 20px; color: #374151; line-height: 1.6;">
                                            Master of the floating kingdom, Galea commands the very winds themselves. 
                                            Her tactical brilliance and elemental mastery make her a formidable ally 
                                            in any battle.
                                        </p>
                                        <div style="background-color: #eff6ff; padding: 15px; border-radius: 6px;">
                                            <p style="margin: 0 0 8px; color: #1e40af; font-size: 14px; font-weight: 600;">
                                                💨 Elemental Mastery: Control air currents and wind pressure
                                            </p>
                                            <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                                                🏰 Kingdom Power: Command floating citadels and sky fortresses
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Card Showcase -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0;">
                                <tr>
                                    <td>
                                        <h4 style="margin: 0 0 30px; color: #1f2937; font-size: 24px; font-weight: bold; text-align: center;">
                                            New Air Creatures This Week
                                        </h4>

                                        <!-- Swoop Card -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            <tr>
                                                <td style="width: 200px; vertical-align: top;">
                                                    <img src="https://elementalgames.gg/images/cards/new-marketing/swoop-r.webp" 
                                                         alt="Swoop"
                                                         style="width: 200px; height: auto; display: block;">
                                                </td>
                                                <td style="padding: 30px; vertical-align: middle;">
                                                    <h5 style="margin: 0 0 10px; color: #2563eb; font-size: 28px; font-weight: bold;">Swoop</h5>
                                                    <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px; font-style: italic;">Swift aerial predator</p>
                                                    <div style="background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 15px; border-radius: 6px;">
                                                        <p style="margin: 0 0 5px; font-weight: 600;">📅 Release Date:</p>
                                                        <p style="margin: 0; font-size: 16px; font-weight: bold;">July 1st, 2025</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Dumoles Card -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            <tr>
                                                <td style="width: 200px; vertical-align: top;">
                                                    <img src="https://elementalgames.gg/images/cards/new-marketing/dumoles-r.webp" 
                                                         alt="Dumoles"
                                                         style="width: 200px; height: auto; display: block;">
                                                </td>
                                                <td style="padding: 30px; vertical-align: middle;">
                                                    <h5 style="margin: 0 0 10px; color: #2563eb; font-size: 28px; font-weight: bold;">Dumoles</h5>
                                                    <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px; font-style: italic;">Tactical air support</p>
                                                    <div style="background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 15px; border-radius: 6px;">
                                                        <p style="margin: 0 0 5px; font-weight: 600;">📅 Release Date:</p>
                                                        <p style="margin: 0; font-size: 16px; font-weight: bold;">July 2nd, 2025</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Nimbus Card -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                            <tr>
                                                <td style="width: 200px; vertical-align: top;">
                                                    <img src="https://elementalgames.gg/images/cards/new-marketing/nimbus-r.webp" 
                                                         alt="Nimbus"
                                                         style="width: 200px; height: auto; display: block;">
                                                </td>
                                                <td style="padding: 30px; vertical-align: middle;">
                                                    <h5 style="margin: 0 0 10px; color: #2563eb; font-size: 28px; font-weight: bold;">Nimbus</h5>
                                                    <p style="margin: 0 0 15px; color: #6b7280; font-size: 16px; font-style: italic;">Master of the winds</p>
                                                    <div style="background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 15px; border-radius: 6px;">
                                                        <p style="margin: 0 0 5px; font-weight: 600;">📅 Release Date:</p>
                                                        <p style="margin: 0; font-size: 16px; font-weight: bold;">July 3rd, 2025</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Weekly Giveaway Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0; background: linear-gradient(90deg, #fef3c7 0%, #fed7aa 100%); border: 2px solid #f59e0b; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <h4 style="margin: 0 0 20px; color: #ea580c; font-size: 24px; font-weight: bold;">
                                            🎁 Weekly Giveaway - Air Kingdom Edition
                                        </h4>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 50%; padding: 10px; vertical-align: top;">
                                                    <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #fbbf24; min-height: 100px; display: flex; flex-direction: column; justify-content: center;">
                                                        <div style="font-size: 24px; margin-bottom: 8px; text-align: center;">🏆</div>
                                                        <h5 style="margin: 0 0 8px; color: #1f2937; font-size: 14px; font-weight: bold; text-align: center;">Grand Prize</h5>
                                                        <p style="margin: 0; color: #4b5563; font-size: 12px; text-align: center; line-height: 1.3;">
                                                            1 lucky subscriber wins an <strong>exclusive Galea promo card</strong> post-launch!
                                                        </p>
                                                    </div>
                                                </td>
                                                <td style="width: 50%; padding: 10px; vertical-align: top;">
                                                    <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #fbbf24; min-height: 100px; display: flex; flex-direction: column; justify-content: center;">
                                                        <div style="font-size: 24px; margin-bottom: 8px; text-align: center;">🎪</div>
                                                        <h5 style="margin: 0 0 8px; color: #1f2937; font-size: 14px; font-weight: bold; text-align: center;">Runner-Up Prizes</h5>
                                                        <p style="margin: 0; color: #4b5563; font-size: 12px; text-align: center; line-height: 1.3;">
                                                            2 lucky subscribers win <strong>free booster packs</strong> post-launch!
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <div style="background-color: #2563eb; color: #ffffff; padding: 20px; border-radius: 6px; margin-top: 20px;">
                                            <p style="margin: 0 0 10px; font-weight: 600;">How to Enter:</p>
                                            <p style="margin: 0; font-size: 14px;">
                                                Join our Discord and follow us on social media to participate in all giveaways!
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Call to Action -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 15px 30px; background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); border-radius: 6px;">
                                                    <a href="https://elementalgames.gg/kinbrold/zalos" 
                                                       style="color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 600; display: block;">
                                                        Explore the Air Kingdom
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 20px auto 0;">
                                            <tr>
                                                <td style="padding: 0 10px;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="padding: 12px 24px; border: 1px solid #2563eb; border-radius: 6px;">
                                                                <a href="https://elementalgames.gg/cards/campaign" 
                                                                   style="color: #2563eb; text-decoration: none; font-size: 14px; font-weight: 600;">
                                                                    View All Cards
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="padding: 0 10px;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="padding: 12px 24px; border: 1px solid #7c3aed; border-radius: 6px;">
                                                                <a href="https://discord.gg/PVrgZBmcMq" 
                                                                   style="color: #7c3aed; text-decoration: none; font-size: 14px; font-weight: 600;">
                                                                    Join Discord
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Social Links -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 40px 0; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="text-align: center;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 15px;">
                                                    <a href="https://discord.gg/PVrgZBmcMq" style="color: #6b7280; text-decoration: none; font-size: 14px;">Discord</a>
                                                </td>
                                                <td style="padding: 0 15px;">
                                                    <a href="https://x.com/elekin_tcg" style="color: #6b7280; text-decoration: none; font-size: 14px;">Twitter</a>
                                                </td>
                                                <td style="padding: 0 15px;">
                                                    <a href="https://www.instagram.com/elekin_tcg/" style="color: #6b7280; text-decoration: none; font-size: 14px;">Instagram</a>
                                                </td>
                                                <td style="padding: 0 15px;">
                                                    <a href="https://www.tiktok.com/@elekin_tcg" style="color: #6b7280; text-decoration: none; font-size: 14px;">TikTok</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
                            <p style="margin: 0 0 10px;">Next week: The Fire Kingdom of Scarto awaits...</p>
                            <p style="margin: 0 0 10px;">You received this email because you subscribed to Elekin TCG updates.</p>
                            <a href="https://elementalgames.gg/unsubscribe?email=${encodeURIComponent(email)}" style="color: #2563eb; text-decoration: underline;">Unsubscribe</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    const subject = testEmail ? 
      '🧪 TEST: Zalos, The Air Kingdom, Rises 💨' : 
      'Zalos, The Air Kingdom, Rises 💨';

    const emailResponse = await resend.emails.send({
      from: 'Elemental Games <onboarding@resend.dev>',
      to: email,
      subject: subject,
      html: airKingdomEmailHTML,
    });

    console.log('Air Kingdom email sent successfully:', emailResponse);
    
    res.json({ 
      message: 'Air Kingdom email sent successfully! Check your inbox.',
      emailResponse,
      debug: {
        sentTo: email,
        isTest: testEmail,
        emailSent: true
      }
    });

  } catch (error) {
    console.error('Error sending Air Kingdom email:', error);
    res.status(500).json({ 
      message: 'Error sending email', 
      error: error.message
    });
  }
});

// Unsubscribe endpoint
app.post('/api/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log('Processing unsubscribe for:', normalizedEmail);

    // Update subscriber status to 'unsubscribed'
    const { data, error } = await supabase
      .from('subscribers')
      .update({ 
        status: 'unsubscribed'
      })
      .eq('email', normalizedEmail)
      .select();

    if (error) {
      console.error('Error unsubscribing:', error);
      return res.status(500).json({ 
        error: 'Failed to unsubscribe',
        details: error.message 
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ 
        error: 'Email not found in subscriber list' 
      });
    }

    console.log('Successfully unsubscribed:', normalizedEmail);

    return res.status(200).json({ 
      success: true,
      message: 'Successfully unsubscribed from all future emails',
      email: normalizedEmail
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Resubscribe endpoint for users who want to re-subscribe
app.post('/api/resubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log('Processing resubscribe for:', normalizedEmail);

    // Update subscriber status back to 'active'
    const { data, error } = await supabase
      .from('subscribers')
      .update({ 
        status: 'active'
      })
      .eq('email', normalizedEmail)
      .select();

    if (error) {
      console.error('Error resubscribing:', error);
      return res.status(500).json({ 
        error: 'Failed to resubscribe',
        details: error.message 
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ 
        error: 'Email not found in subscriber list' 
      });
    }

    console.log('Successfully resubscribed:', normalizedEmail);

    return res.status(200).json({ 
      success: true,
      message: 'Successfully resubscribed to future emails',
      email: normalizedEmail
    });

  } catch (error) {
    console.error('Resubscribe error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Discord Giveaway Email endpoint
app.post('/api/send-discord-giveaway-email', async (req, res) => {
  console.log('Discord giveaway email endpoint hit');
  
  try {
    console.log('API Key status:', RESEND_API_KEY ? `Found (${RESEND_API_KEY.substring(0, 8)}...)` : 'Missing');
    const resend = new Resend(RESEND_API_KEY);

    // Fetch all active subscribers from database
    console.log('Fetching all active subscribers from database...');
    
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email')
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching subscribers:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch subscribers',
        details: error.message 
      });
    }

    if (!subscribers || subscribers.length === 0) {
      return res.json({ 
        message: 'No active subscribers found',
        debug: {
          subscriberCount: 0
        }
      });
    }

    console.log(`Found ${subscribers.length} active subscribers`);

    // Calculate countdown time to 12:00 PM EST (today)
    const now = new Date();
    const giveawayTime = new Date();
    giveawayTime.setHours(17, 0, 0, 0); // 12:00 PM EST = 17:00 UTC
    
    // If it's already past 12 PM today, set it for tomorrow
    if (now >= giveawayTime) {
      giveawayTime.setDate(giveawayTime.getDate() + 1);
    }

    const discordGiveawayEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎁 First Discord Giveaway - Join Now!</title>
    <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background-color: #1A103C; color: #fff; }
        .countdown-timer { background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
        .social-button { display: inline-block; padding: 12px 25px; margin: 10px; background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
        .discord-button { background: linear-gradient(135deg, #5865f2, #7289da); padding: 15px 30px; margin: 20px 0; border-radius: 10px; font-size: 18px; }
    </style>
    <script>
        function updateCountdown() {
            const giveawayTime = new Date('${giveawayTime.toISOString()}').getTime();
            const now = new Date().getTime();
            const distance = giveawayTime - now;

            if (distance > 0) {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('countdown').innerHTML = 
                    hours.toString().padStart(2, '0') + ':' + 
                    minutes.toString().padStart(2, '0') + ':' + 
                    seconds.toString().padStart(2, '0');
            } else {
                document.getElementById('countdown').innerHTML = "🎁 GIVEAWAY IS LIVE! 🎁";
            }
        }

        setInterval(updateCountdown, 1000);
        window.onload = updateCountdown;
    </script>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 30px 20px; text-align: center; background: linear-gradient(135deg, #1A103C, #2d1b69);">
                    <img src="https://elementalgames.gg/Games_Logo.png" alt="Elemental Games" style="max-width: 200px; margin-bottom: 20px;">
                    <h1 style="margin: 0; color: #fcd34d; font-size: 32px; text-transform: uppercase; letter-spacing: 2px;">🎁 FIRST DISCORD GIVEAWAY! 🎁</h1>
                    <p style="margin: 10px 0 0; color: #e2e8f0; font-size: 18px;">Join our Discord community for your chance to win!</p>
                </td>
            </tr>
        </table>

        <!-- Countdown Timer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 20px;">
                    <div class="countdown-timer">
                        <h2 style="margin: 0 0 15px; color: white; font-size: 24px;">⏰ Giveaway Countdown</h2>
                        <div id="countdown" style="font-size: 36px; font-weight: bold; color: #fcd34d; font-family: 'Courier New', monospace;">
                            Loading...
                        </div>
                        <p style="margin: 15px 0 0; color: white; font-size: 16px;">Until 12:00 PM EST Today!</p>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Main Discord CTA -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 20px; text-align: center;">
                    <h2 style="color: #fcd34d; font-size: 28px; margin-bottom: 20px;">🎮 Join Our Discord Community</h2>
                    <p style="color: #e2e8f0; font-size: 18px; line-height: 1.6; margin-bottom: 25px;">
                        Our <strong>FIRST EVER</strong> Discord giveaway starts at <strong>12:00 PM EST today</strong>! 
                        Don't miss your chance to win exclusive Elekin TCG prizes!
                    </p>
                    
                    <div class="discord-button">
                        <a href="https://discord.gg/PVrgZBmcMq" style="color: white; text-decoration: none; font-weight: bold;">
                            🎮 JOIN DISCORD NOW
                        </a>
                    </div>
                    
                    <p style="color: #a855f7; font-size: 16px; margin-top: 15px;">
                        ✨ <strong>What you can win:</strong> Exclusive card packs, promo cards, and special edition items!
                    </p>
                </td>
            </tr>
        </table>

        <!-- Pre-Launch Giveaways Section -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 20px; background: rgba(124, 58, 237, 0.15); border-radius: 10px; margin: 20px;">
                    <h3 style="color: #fcd34d; font-size: 24px; margin-bottom: 15px; text-align: center;">🎁 Join Discord for ALL Pre-Launch Giveaways!</h3>
                    <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; text-align: center;">
                        This is just the beginning! As we approach our June 2025 launch, we'll be hosting <strong>weekly giveaways</strong> 
                        exclusively for our Discord community members. From rare card previews to limited edition items, 
                        Discord members get first access to everything!
                    </p>
                    <ul style="color: #e2e8f0; font-size: 16px; line-height: 1.8; max-width: 400px; margin: 20px auto;">
                        <li>🎮 <strong>Weekly Discord Giveaways</strong></li>
                        <li>🃏 <strong>Exclusive Card Previews</strong></li>
                        <li>⚡ <strong>Early Access Opportunities</strong></li>
                        <li>👥 <strong>Community Game Nights</strong></li>
                        <li>📢 <strong>Launch Day Special Events</strong></li>
                    </ul>
                </td>
            </tr>
        </table>

        <!-- Social Media Follow Section -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 30px 20px; text-align: center;">
                    <h3 style="color: #fcd34d; font-size: 24px; margin-bottom: 20px;">📱 Follow Us & Boost Our Support!</h3>
                    <p style="color: #e2e8f0; font-size: 16px; margin-bottom: 25px;">
                        Help us grow the Elekin community! Follow us on social media to stay updated with the latest 
                        news, behind-the-scenes content, and participate in cross-platform contests!
                    </p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                        <tr>
                            <td style="padding: 10px;">
                                <a href="https://www.tiktok.com/@elekin_tcg" class="social-button" style="background: linear-gradient(135deg, #ff0050, #ff4040);">
                                    📱 Follow on TikTok
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">
                                <a href="https://www.instagram.com/elekin_tcg/" class="social-button" style="background: linear-gradient(135deg, #e4405f, #f77737);">
                                    📸 Follow on Instagram
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">
                                <a href="https://www.facebook.com/elekin.tcg" class="social-button" style="background: linear-gradient(135deg, #1877f2, #42a5f5);">
                                    👍 Like on Facebook
                                </a>
                            </td>
                        </tr>
                    </table>
                    
                    <p style="color: #a855f7; font-size: 14px; margin-top: 20px;">
                        Your follows and shares help us reach more TCG enthusiasts like you! 🚀
                    </p>
                </td>
            </tr>
        </table>

        <!-- Call to Action Summary -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 20px; background: linear-gradient(135deg, #7c3aed, #a855f7); text-align: center; border-radius: 10px; margin: 20px;">
                    <h3 style="color: white; font-size: 20px; margin-bottom: 15px;">🚀 Don't Miss Out!</h3>
                    <p style="color: white; font-size: 16px; margin-bottom: 20px;">
                        Join our Discord community TODAY for your chance to win in our first giveaway and 
                        stay connected for all future pre-launch events!
                    </p>
                    <div class="discord-button" style="background: rgba(255,255,255,0.2);">
                        <a href="https://discord.gg/PVrgZBmcMq" style="color: white; text-decoration: none; font-weight: bold;">
                            🎮 JOIN DISCORD - GIVEAWAY AT 12PM EST!
                        </a>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="padding: 30px 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
                    <p style="margin: 0 0 15px; color: #9ca3af; font-size: 14px;">
                        ⚡ Launching June 2025! Get ready for the ultimate TCG experience! ⚡
                    </p>
                    <p style="margin: 0 0 15px; color: #9ca3af; font-size: 12px;">
                        Elemental Games LLC © 2024. All rights reserved.
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                        You received this email because you subscribed to Elekin TCG updates.
                        <br><br>
                        <a href="https://elementalgames.gg/unsubscribe?email=SUBSCRIBER_EMAIL" style="color: #a855f7; text-decoration: none;">Unsubscribe</a>
                    </p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;

    // Send emails to all active subscribers (in batches to avoid rate limits)
    const batchSize = 10;
    const emailPromises = [];
    
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (subscriber) => {
        try {
          // Customize email content for each subscriber
          const personalizedHTML = discordGiveawayEmailHTML.replace(
            'SUBSCRIBER_EMAIL', 
            encodeURIComponent(subscriber.email)
          );

          const emailResponse = await resend.emails.send({
            from: 'Elemental Games <noreply@elementalgames.gg>',
            to: subscriber.email,
            subject: '🎁 FIRST Discord Giveaway at 12PM EST - Join Now!',
            html: personalizedHTML,
          });
          
          return { 
            email: subscriber.email, 
            success: true, 
            response: emailResponse 
          };
        } catch (error) {
          console.error(`Failed to send to ${subscriber.email}:`, error);
          return { 
            email: subscriber.email, 
            success: false, 
            error: error.message 
          };
        }
      });
      
      emailPromises.push(...batchPromises);
      
      // Add delay between batches to respect rate limits
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      }
    }

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log(`Discord giveaway email campaign completed: ${successCount} successful, ${failureCount} failed`);
    
    res.json({ 
      message: 'Discord giveaway email campaign sent successfully!',
      emailsSent: successCount,
      emailsFailed: failureCount,
      totalSubscribers: subscribers.length,
      debug: {
        giveawayTime: giveawayTime.toISOString(),
        currentTime: now.toISOString()
      }
    });

  } catch (error) {
    console.error('Error sending Discord giveaway email campaign:', error);
    res.status(500).json({ 
      message: 'Error sending email campaign', 
      error: error.message
    });
  }
});

// Shopify Checkout endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    // Validate that all items have variantId
    for (const item of items) {
      if (!item.variantId) {
        return res.status(400).json({ error: 'All items must have a variantId' });
      }
    }

    // Import the server-specific shopify function
    const { createCheckoutWithItems, getVariantIdByHandle, getVariantAndSellingPlanByHandle } = await import('./src/lib/shopify-server.js');

    // Resolve any items that only provided a handle
    const resolvedItems = [];
    for (const item of items) {
      if (item.variantId) {
        resolvedItems.push({ variantId: item.variantId, sellingPlanId: item.sellingPlanId, quantity: item.quantity || 1 });
      } else if (item.handle) {
        const result = await getVariantAndSellingPlanByHandle(item.handle);
        resolvedItems.push({ variantId: result.variantId, sellingPlanId: result.sellingPlanId, quantity: item.quantity || 1 });
      } else {
        throw new Error('Each item must include either variantId or handle');
      }
    }

    const checkout = await createCheckoutWithItems(resolvedItems);

    if (!checkout || !checkout.webUrl) {
      return res.status(500).json({ error: 'Failed to create checkout session' });
    }

    res.json({
      checkoutUrl: checkout.webUrl,
      checkoutId: checkout.id
    });

  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session', 
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`CORS enabled for: ${corsOptions.origin.join(', ')}`);
});