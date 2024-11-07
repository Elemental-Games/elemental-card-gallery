// src/lib/email-service.js
import { Resend } from 'resend';

// Changed from import.meta.env to just the environment variable name
const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export async function sendWelcomeEmail(email) {
  try {
    console.log('Starting email send to:', email);

    const response = await fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Email API error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('Email send result:', result);

    if (result.error) {
      console.error('Email send error:', result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    return false;
  }
}

// Development version of the email template for reference
const emailTemplate = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <img src="https://elementalgames.gg/Games_Logo.png" alt="Elemental Games Logo" style="width: 200px; margin: 20px auto; display: block;">
    
    <h1 style="color: #6B46C1; text-align: center;">Welcome to Elemental Masters!</h1>
    
    <p>Thank you for subscribing to our newsletter! We're excited to have you join our growing community of Elemental Masters players.</p>
    
    <p>You'll be the first to know about:</p>
    <ul>
      <li>Our upcoming Kickstarter launch</li>
      <li>Exclusive card previews</li>
      <li>Tournament announcements</li>
      <li>Community events and news</li>
    </ul>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://elementalgames.gg/gameplay" 
         style="background-color: #6B46C1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
        Learn How to Play
      </a>
    </div>
    
    <p>Connect with us:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="https://discord.gg/qXNWh4dMve" style="margin: 0 10px;">Discord</a>
      <a href="https://x.com/elemental_tcg" style="margin: 0 10px;">X (Twitter)</a>
    </div>
    
    <p style="font-size: 12px; color: #666; text-align: center; margin-top: 40px;">
      You received this email because you subscribed to Elemental Masters updates.
      <br>
      To unsubscribe, click <a href="https://elementalgames.gg/unsubscribe?email=\${email}">here</a>.
    </p>
  </div>
`;

// Helper function to test email template locally
export async function testEmailTemplate(email) {
  console.log('Email template preview for:', email);
  console.log(emailTemplate.replace('${email}', email));
  return true;
}