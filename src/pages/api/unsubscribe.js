export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    const email = Buffer.from(token, 'base64').toString();

    // Here you would typically remove the email from your database
    // For now, we'll just return success
    
    return res.status(200).json({ message: 'Successfully unsubscribed' });
  } catch (error) {
    return res.status(500).json({ message: 'Error unsubscribing', error: error.message });
  }
}