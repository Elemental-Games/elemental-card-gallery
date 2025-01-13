import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendDonationEmail = async (donation) => {
  try {
    await resend.emails.send({
      from: 'Elemental Masters <donations@elementalmasters.com>',
      to: donation.email,
      subject: 'Thank You for Your Donation!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #9333ea;">Thank You for Your Support!</h1>
          
          <p>Dear ${donation.is_anonymous ? 'Supporter' : donation.display_name},</p>
          
          <p>Thank you for your generous donation of $${donation.amount} to Elemental Masters. 
          Your support helps us continue developing and improving the game.</p>
          
          <p>Your official payment receipt will be sent separately by Stripe.</p>
          
          <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 5px;">
            <p style="margin: 0;"><strong>Donation Amount:</strong> $${donation.amount}</p>
            <p style="margin: 10px 0 0;"><strong>Date:</strong> ${new Date(donation.created_at).toLocaleDateString()}</p>
          </div>
          
          <p>Stay connected with us:</p>
          <ul>
            <li>Follow us on X: <a href="https://x.com/elemental_tcg">@elemental_tcg</a></li>
            <li>Join our Discord: <a href="https://discord.gg/qXNWh4dMve">Elemental Masters Discord</a></li>
          </ul>
          
          <p>Best regards,<br/>The Elemental Masters Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    // Don't throw error - we don't want to break the donation flow
  }
}; 