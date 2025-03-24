import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

// This function checks if we're currently online
const checkOnlineStatus = () => {
  return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' 
    ? navigator.onLine 
    : true; // Assume online if we can't detect
};

export const sendSubscriptionThanksEmail = async (email) => {
  try {
    // Check if we're online before attempting to send
    if (!checkOnlineStatus()) {
      console.warn('Offline: Cannot send subscription thank you email');
      return {
        success: false,
        message: 'Cannot send email while offline',
        offline: true
      };
    }

    // Continue with sending the email
    const { error } = await resend.emails.send({
      from: 'Elemental Games <contact@elementalgames.gg>',
      to: email,
      subject: '🔥 Welcome to the World of Elekin! 🌊',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1A103C; color: #fff; padding: 30px; border-radius: 15px; border: 2px solid #fcd34d;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://elementalgames.gg/logo.png" alt="Elemental Games Logo" style="max-width: 180px; margin-bottom: 15px;" />
            <h1 style="margin: 0; color: #fcd34d; font-size: 32px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0px 2px 4px rgba(0,0,0,0.5);">Welcome, Elemental Master!</h1>
          </div>

          <div style="background-color: rgba(109, 40, 217, 0.3); border-radius: 10px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #fcd34d;">
            <p style="font-size: 18px; line-height: 1.6;">Thank you for joining our mailing list! You're now part of an exclusive group who will be the <span style="color: #fcd34d; font-weight: bold;">first to know</span> about Elekin: Masters of Kinbrold's launch!</p>
            
            <p style="font-size: 18px; line-height: 1.6;">As a subscriber, you'll receive:</p>
            
            <ul style="list-style-type: none; padding: 0; margin: 20px 0;">
              <li style="padding: 10px 0 10px 35px; background-image: url('https://elementalgames.gg/fire.png'); background-repeat: no-repeat; background-position: left center; background-size: 25px; margin-bottom: 10px;">Exclusive card reveals and lore updates</li>
              <li style="padding: 10px 0 10px 35px; background-image: url('https://elementalgames.gg/water.png'); background-repeat: no-repeat; background-position: left center; background-size: 25px; margin-bottom: 10px;">First access to pre-order opportunities</li>
              <li style="padding: 10px 0 10px 35px; background-image: url('https://elementalgames.gg/earth.png'); background-repeat: no-repeat; background-position: left center; background-size: 25px; margin-bottom: 10px;">Special subscriber-only promotions</li>
              <li style="padding: 10px 0 10px 35px; background-image: url('https://elementalgames.gg/air.png'); background-repeat: no-repeat; background-position: left center; background-size: 25px;">Early access to game features and beta tests</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background: linear-gradient(90deg, #6d28d9 0%, #9333ea 100%); padding: 3px; border-radius: 50px;">
              <a href="https://elementalgames.gg/join-now" style="display: block; background-color: #fcd34d; color: #1A103C; text-decoration: none; padding: 15px 30px; border-radius: 50px; font-weight: bold; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Create Your Account</a>
            </div>
          </div>
          
          <div style="background-color: rgba(252, 211, 77, 0.1); border-radius: 10px; padding: 20px; text-align: center; margin-top: 30px;">
            <p style="font-size: 16px; margin-bottom: 15px; color: #d1d5db;">Join our growing community:</p>
            <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 15px;">
              <a href="https://discord.gg/qXNWh4dMve" style="color: #d1d5db; text-decoration: none; font-weight: bold;">Discord</a>
              <a href="https://x.com/elemental_tcg" style="color: #d1d5db; text-decoration: none; font-weight: bold;">Twitter (X)</a>
              <a href="https://instagram.com/elemental_tcg" style="color: #d1d5db; text-decoration: none; font-weight: bold;">Instagram</a>
            </div>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; color: #9ca3af; font-size: 12px;">
            <p>⚡ Launching in <strong>June 2025</strong>! ⚡</p>
            <p style="color: #9ca3af; font-size: 11px;">Until Launch Month June 2025</p>
            <p>Elemental Games LLC © 2024. All rights reserved.</p>
            <p>You're receiving this email because you signed up for updates about Elekin: Masters of Kinbrold.</p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send email'
      };
    }

    return {
      success: true,
      message: 'Subscription thank you email sent successfully'
    };
  } catch (error) {
    console.error('Failed to send subscription thank you email:', error);
    return {
      success: false,
      message: error.message || 'Failed to send email'
    };
  }
};

export const sendWelcomeEmail = async (email) => {
  try {
    // Check if we're online before attempting to send
    if (!checkOnlineStatus()) {
      console.warn('Offline: Cannot send welcome email');
      return {
        success: false,
        message: 'Cannot send email while offline',
        offline: true
      };
    }

    // Continue with sending the email
    const { error } = await resend.emails.send({
      from: 'Elemental Games <contact@elementalgames.gg>',
      to: email,
      subject: 'Welcome to Elemental Games!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #6d28d9;">Welcome to Elemental Games!</h1>
          <p>Thank you for creating an account! Please check your email for a verification link to complete your registration.</p>
          <p>Once verified, you can:</p>
          <ul>
            <li>Build and save your decks</li>
            <li>Share decks with the community</li>
            <li>Participate in discussions</li>
          </ul>
          <div style="margin: 20px 0;">
            <p>Connect with us:</p>
            <a href="https://x.com/elemental_tcg" style="color: #6d28d9;">Twitter</a> | 
            <a href="https://discord.gg/qXNWh4dMve" style="color: #6d28d9;">Discord</a>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            You received this email because you created an account at Elemental Games.
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send email'
      };
    }

    return {
      success: true,
      message: 'Welcome email sent successfully'
    };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return {
      success: false,
      message: error.message || 'Failed to send email'
    };
  }
};