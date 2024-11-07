// api/unsubscribe.js
export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { email, token } = req.query;
      
      // Update subscriber status in Supabase
      const { error } = await supabase
        .from('subscribers')
        .update({ status: 'unsubscribed' })
        .eq('email', email);
  
      if (error) {
        throw error;
      }
  
      // Redirect to unsubscribe confirmation page
      return res.redirect(307, `/unsubscribe-success?email=${email}`);
    } catch (error) {
      console.error('Unsubscribe error:', error);
      return res.redirect(307, '/unsubscribe-error');
    }
  }