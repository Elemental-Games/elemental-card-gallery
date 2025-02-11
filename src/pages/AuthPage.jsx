import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Icons } from '@/components/ui/icons';
import { sendWelcomeEmail } from '@/lib/email-service';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const location = useLocation();

  const oauthProviders = [
    {
      name: 'google',
      icon: 'google',
      label: 'Google',
      style: 'bg-white hover:bg-gray-100 text-gray-900'
    },
    {
      name: 'discord',
      icon: 'discord',
      label: 'Discord',
      style: 'bg-[#5865F2] hover:bg-[#4752C4] text-white'
    }
  ];

  useEffect(() => {
    // Check if we have a redirect URL in the state
    const from = location.state?.from || '/cards/deck-builder';
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        toast.success('Successfully signed in!');
        navigate(from);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = isLogin 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ 
            email, 
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`,
              data: {
                username: email.split('@')[0],
              }
            }
          });

      if (error) throw error;

      if (isLogin) {
        toast.success('Successfully signed in!');
        navigate(-1);
      } else {
        try {
          await sendWelcomeEmail(email);
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Continue with signup flow even if email fails
        }
        toast.success('Registration successful! Please check your email to verify your account.');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: provider === 'google' 
            ? 'profile email' 
            : 'identify email',
        }
      });
      
      if (error) throw error;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-purple-950/70 border border-purple-500/30">
          <h1 className="text-2xl font-bold text-center text-yellow-400 mb-8">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-purple-900/50"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-purple-900/50"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-purple-950 text-purple-300">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {oauthProviders.map((provider) => (
                <Button
                  key={provider.name}
                  type="button"
                  onClick={() => handleOAuth(provider.name)}
                  className={provider.style}
                  disabled={loading}
                >
                  <div className="mr-2 h-4 w-4">
                    {Icons[provider.icon]}
                  </div>
                  {provider.label}
                </Button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-purple-300">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-400 hover:text-yellow-300"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage; 