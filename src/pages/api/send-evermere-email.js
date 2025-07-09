import sendEvermereEmail from '../../../send-evermere-email';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const { testEmail, email } = req.body || {};
    await sendEvermereEmail({ testEmail, email });
    res.status(200).json({ message: testEmail ? `Test Evermere email sent to ${email}` : 'Evermere email sent to all subscribers!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send Evermere email', error: error.message });
  }
} 