/* eslint-env node */
const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEvermereEmail() {
  try {
    // Read the HTML email template
    const emailHtml = fs.readFileSync(path.join(__dirname, 'evermere-kingdom-email.html'), 'utf8');
    
    const { data, error } = await resend.emails.send({
      from: 'Elemental Games <noreply@elementalgames.gg>',
      to: ['subscribers@elementalgames.gg'], // Replace with your subscriber list
      subject: 'Evermere, The Central Kingdom, Awakens 🏰',
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending email:', error);
      return;
    }

    console.log('Evermere email sent successfully:', data);
  } catch (error) {
    console.error('Failed to send Evermere email:', error);
  }
}

// Only run if called directly
if (require.main === module) {
  sendEvermereEmail();
}

module.exports = sendEvermereEmail; 