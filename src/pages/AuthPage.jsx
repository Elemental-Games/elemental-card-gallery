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
import confetti from 'canvas-confetti';
import { SuccessAnimation } from '@/components/ui/success-animation';

const shootConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const location = useLocation();

  const oauthProviders = [
    {
      name: 'google',
      icon: 'google',
      label: 'Google',
      style: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm'
    },
    {
      name: 'discord',
      icon: 'discord',
      label: 'Discord',
      style: 'bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-sm'
    }
  ];

  useEffect(() => {
    // Check if we have a redirect URL in the state
    const from = location.state?.from || '/cards/deck-builder';
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        shootConfetti();
        setShowSuccess(true);
        toast.success('Successfully signed in!');
        setTimeout(() => {
          setShowSuccess(false);
          navigate(from);
        }, 2000);
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

      if (error) {
        // Handle rate limiting errors
        if (error.status === 429 || error.message?.includes('too many requests')) {
          toast.error('Please wait a moment before trying again');
          return;
        }
        throw error;
      }

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
      
      if (error) {
        // Handle rate limiting errors
        if (error.status === 429 || error.message?.includes('too many requests')) {
          toast.error('Please wait a moment before trying again');
          return;
        }
        throw error;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {showSuccess && <SuccessAnimation />}
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-purple-900/50 to-purple-950/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card 
            className={`p-8 ${
              isLogin 
                ? 'bg-purple-950/70 border border-purple-500/30' // Darker theme for sign in
                : 'bg-gradient-to-br from-purple-900 to-purple-950 border-2 border-yellow-500/30 shadow-xl shadow-purple-900/50' // Brighter theme for sign up
            }`}
          >
            <motion.h1 
              key={isLogin ? 'signin' : 'signup'}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-2xl font-bold text-center mb-8 ${
                isLogin ? 'text-purple-200' : 'text-yellow-400'
              }`}
            >
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </motion.h1>

            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <Label 
                  htmlFor="email" 
                  className={isLogin ? 'text-purple-200' : 'text-yellow-100'}
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`${
                    isLogin 
                      ? 'bg-purple-900/50 border-purple-500/30' 
                      : 'bg-purple-800/50 border-2 border-purple-400/30 focus:border-yellow-500/50'
                  } text-white placeholder-purple-300`}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-yellow-100">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-purple-800/50 border-2 border-purple-400/30 focus:border-yellow-500/50 text-white placeholder-purple-300"
                  placeholder="Enter your password"
                />
              </div>

              <Button 
                type="submit" 
                className={`w-full ${
                  isLogin
                    ? 'bg-purple-600 hover:bg-purple-500'
                    : 'bg-yellow-500 hover:bg-yellow-400 text-purple-900'
                } font-bold transition-all duration-300 transform hover:scale-105`}
                disabled={loading}
              >
                {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-300/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${
                    isLogin 
                      ? 'bg-purple-950/70 text-purple-300' 
                      : 'bg-gradient-to-br from-purple-900 to-purple-950 text-yellow-100'
                  }`}>
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
                    className={`${provider.style} h-12 px-6 transform transition-all duration-300 hover:scale-102 font-medium flex items-center justify-center gap-2 rounded-lg min-w-[160px]`}
                    disabled={loading}
                  >
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                      {Icons[provider.icon]}
                    </span>
                    <span className="text-sm font-semibold">
                      {provider.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-yellow-100">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-yellow-400 hover:text-yellow-300 font-bold underline underline-offset-2"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage; 