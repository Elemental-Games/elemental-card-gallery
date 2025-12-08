import { sendHolidayBundlesEmail } from '../../../send-holiday-bundles-email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { testEmail = false, email: testEmailAddress, sendToAll = false } = req.body;

    const result = await sendHolidayBundlesEmail({
      testEmail: testEmail || !sendToAll,
      email: testEmailAddress || 'mark@elementalgames.gg',
      sendToAll: sendToAll
    });

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to send holiday bundles email'
    });
  }
}


