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
import { PartyPopper } from 'lucide-react';

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rateLimitedUntil, setRateLimitedUntil] = useState(null);
  const [error, setError] = useState(null);
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

  const passwordsMatch = !confirmPassword || password === confirmPassword;

  useEffect(() => {
    // Check if we have a redirect URL in the state
    const from = location.state?.from || '/cards/deck-builder';
    
    // Check if we have a mode in the state
    if (location.state?.mode === 'signup') {
      setIsLogin(false);
    }
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
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

    // Check for pre-filled email from signup form
    const signupEmail = localStorage.getItem('signupEmail');
    if (signupEmail) {
      setEmail(signupEmail);
      setIsLogin(true); // Ensure we're on the login form
      localStorage.removeItem('signupEmail'); // Clear the stored email
    }

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          if (error.message.includes('rate limit')) {
            setRateLimitedUntil(Date.now() + 30000);
            setError('Too many attempts. Please try again in 30 seconds.');
          } else {
            setError(error.message);
          }
          setLoading(false);
          return;
        }

        // Successful login
        setShowSuccess(true);
        shootConfetti();
      } else {
        // Check if passwords match
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        // Check if we're currently rate limited
        if (rateLimitedUntil && Date.now() < rateLimitedUntil) {
          const waitSeconds = Math.ceil((rateLimitedUntil - Date.now()) / 1000);
          setError(`Too many attempts. Please try again in ${waitSeconds} seconds.`);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              email_confirm: true
            }
          }
        });

        console.log('Signup response:', { data, error });

        if (error) {
          console.error('Detailed signup error:', {
            message: error.message,
            status: error.status,
            name: error.name,
            details: error
          });
          
          if (error.message.includes('rate limit')) {
            setRateLimitedUntil(Date.now() + 30000);
            setError('Too many attempts. Please try again in 30 seconds.');
          } else if (error.message.includes('confirmation email')) {
            // Try to create the user without immediate email confirmation
            const { data: retryData, error: retryError } = await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
                data: {
                  email_confirm: true
                }
              }
            });

            if (retryError) {
              console.error('Retry signup error:', retryError);
              setError('Error during signup. Please try again.');
            } else if (retryData?.user) {
              setShowSuccess(true);
              shootConfetti();
              toast.success('Account created successfully!', {
                duration: 6000,
                description: 'Please check your email to confirm your account. The email might take a few minutes to arrive.'
              });
            }
          } else {
            setError(error.message);
          }
          setLoading(false);
          return;
        }

        if (data?.user) {
          setShowSuccess(true);
          shootConfetti();
          // Attempt to send welcome email
          try {
            await sendWelcomeEmail(email);
          } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Don't show this error to the user as it's not critical
          }
          toast.success('Please check your email to confirm your account!', {
            duration: 6000,
            description: 'If you don\'t see the email, please check your spam folder.'
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    // Check if we're currently rate limited
    const now = Date.now();
    if (rateLimitedUntil > now) {
      const remainingTime = Math.ceil((rateLimitedUntil - now) / 1000);
      toast.error(`Too many attempts. Please wait ${remainingTime} seconds before trying again`);
      return;
    }

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
        if (error.status === 429 || error.message?.includes('too many requests')) {
          // Set rate limit for 30 seconds from now
          setRateLimitedUntil(Date.now() + 30000);
          toast.error('Too many attempts. Please wait 30 seconds before trying again');
          return;
        }
        throw error;
      }

      // Clear any rate limiting on success
      setRateLimitedUntil(0);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        >
          <div className="bg-purple-900 p-8 rounded-lg border border-purple-500/30 max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <PartyPopper className="w-16 h-16 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {isLogin ? 'Welcome Back!' : 'Welcome Aboard!'}
              </h2>
              <p className="text-xl text-purple-200 mb-8">Get ready to build some amazing decks!</p>
              <Button
                onClick={() => navigate('/elekin/online')}
                className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold px-8 py-6 text-xl w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      )}
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

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
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
              
              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label 
                  htmlFor="password" 
                  className={isLogin ? 'text-purple-200' : 'text-yellow-100'}
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${
                    isLogin 
                      ? 'bg-purple-900/50 border-purple-500/30' 
                      : 'bg-purple-800/50 border-2 border-purple-400/30 focus:border-yellow-500/50'
                  } text-white placeholder-purple-300 ${
                    !isLogin && !passwordsMatch ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div>
                  <Label 
                    htmlFor="confirmPassword" 
                    className="text-yellow-100"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`bg-purple-800/50 border-2 ${
                      passwordsMatch 
                        ? 'border-purple-400/30 focus:border-yellow-500/50' 
                        : 'border-red-500 focus:border-red-500'
                    } text-white placeholder-purple-300`}
                    placeholder="Re-enter your password"
                  />
                  {!passwordsMatch && (
                    <p className="mt-1 text-sm text-red-500">
                      Passwords do not match
                    </p>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                className={`w-full ${
                  isLogin
                    ? 'bg-purple-600 hover:bg-purple-500'
                    : 'bg-yellow-500 hover:bg-yellow-400 text-purple-900'
                } font-bold transition-all duration-300 transform hover:scale-105`}
                disabled={loading || (!isLogin && !passwordsMatch)}
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
                      {Icons[provider.icon]?.()}
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