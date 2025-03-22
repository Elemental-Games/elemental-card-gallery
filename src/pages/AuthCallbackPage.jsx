import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const AuthCallbackPage = () => {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Get the user's email
        const userEmail = session.user.email;
        
        if (userEmail) {
          try {
            // Add user to subscribers table
            const { error: subError } = await supabase
              .from('subscribers')
              .insert([{ email: userEmail, subscribed_at: new Date() }]);
              
            if (subError && subError.code !== '23505') { // Ignore unique violation errors
              console.error('Error adding to subscribers:', subError);
            } else if (!subError) {
              console.log('Added to subscribers successfully');
            }
          } catch (error) {
            console.error('Failed to add to subscribers:', error);
          }
        }
        
        // Redirect to the previous page or dashboard
        const returnTo = localStorage.getItem('returnTo') || '/cards/deck-builder';
        navigate(returnTo);
      } else {
        navigate('/login');
      }
    };
    
    handleCallback();
  }, [supabase, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
    </div>
  );
};

export default AuthCallbackPage; 