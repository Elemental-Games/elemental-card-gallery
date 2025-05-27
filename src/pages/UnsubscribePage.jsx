import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';
import { CheckCircle, XCircle, Mail, ArrowLeft } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateSubscriber = async () => {
      if (!email) {
        setError('missing_email');
        setIsInitialized(true);
        return;
      }

      try {
        // Fetch subscriber to verify
        const { data, error } = await supabase
          .from('subscribers')
          .select('*')
          .eq('email', email)
          .single();

        if (error) {
          console.error('Error fetching subscriber:', error);
          setError('subscriber_not_found');
          setIsInitialized(true);
          return;
        }

        // If token is provided, verify it
        if (token) {
          if (data.unsubscribe_token && data.unsubscribe_token === token) {
            // Token is valid, proceed
            setIsInitialized(true);
          } else {
            setError('invalid_token');
            setIsInitialized(true);
            return;
          }
        } else {
          // No token provided - allow unsubscribe for backward compatibility
          setIsInitialized(true);
        }
      } catch (err) {
        console.error('Exception fetching subscriber:', err);
        setError('unexpected_error');
        setIsInitialized(true);
      }
    };

    validateSubscriber();
  }, [email, token]);

  const handleStaySubscribed = () => {
    toast.success("Thank you for staying with us! We'll keep you updated with exclusive content.");
    navigate('/');
  };

  const handleUnsubscribe = async () => {
    if (!email) {
      toast.error('Email address is required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Update subscriber status to 'unsubscribed'
      const { error } = await supabase
        .from('subscribers')
        .update({ 
          status: 'unsubscribed', 
          unsubscribed_at: new Date().toISOString()
        })
        .eq('email', email);

      if (error) {
        console.error('Error unsubscribing:', error);
        toast.error('Failed to unsubscribe. Please try again.');
        setIsLoading(false);
        return;
      }

      setShowConfirmation(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Exception unsubscribing:', err);
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Loading state
  if (!isInitialized) {
    return (
      <>
        <Helmet>
          <title>Unsubscribe - Elemental Games</title>
          <meta name="description" content="Unsubscribe from Elemental Games emails" />
        </Helmet>
        <div className="min-h-screen bg-[#1A103C] flex items-center justify-center px-4">
          <div className="bg-purple-950/70 p-8 max-w-md w-full rounded-xl border border-purple-500/30">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
              <p className="text-purple-200">
                Please wait while we process your request.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error states
  if (error === 'missing_email') {
    return (
      <>
        <Helmet>
          <title>Invalid Unsubscribe Link - Elemental Games</title>
        </Helmet>
        <div className="min-h-screen bg-[#1A103C] flex items-center justify-center px-4">
          <div className="bg-purple-950/70 p-8 max-w-md w-full rounded-xl border border-red-500/30">
            <div className="text-center">
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Invalid Unsubscribe Link</h1>
              <p className="text-purple-200 mb-6">
                The unsubscribe link you followed appears to be invalid or missing an email address.
              </p>
              <Button 
                onClick={() => navigate('/')} 
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Homepage
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error === 'invalid_token') {
    return (
      <>
        <Helmet>
          <title>Invalid Unsubscribe Token - Elemental Games</title>
        </Helmet>
        <div className="min-h-screen bg-[#1A103C] flex items-center justify-center px-4">
          <div className="bg-purple-950/70 p-8 max-w-md w-full rounded-xl border border-red-500/30">
            <div className="text-center">
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Invalid Unsubscribe Token</h1>
              <p className="text-purple-200 mb-6">
                The unsubscribe link you followed contains an invalid token. Please use the link from the most recent email.
              </p>
              <Button 
                onClick={() => navigate('/')} 
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Homepage
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error === 'subscriber_not_found') {
    return (
      <>
        <Helmet>
          <title>Email Not Found - Elemental Games</title>
        </Helmet>
        <div className="min-h-screen bg-[#1A103C] flex items-center justify-center px-4">
          <div className="bg-purple-950/70 p-8 max-w-md w-full rounded-xl border border-yellow-500/30">
            <div className="text-center">
              <Mail className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Email Not Found</h1>
              <p className="text-purple-200 mb-6">
                We couldn&apos;t find <span className="text-yellow-400 font-semibold">{email}</span> in our subscriber list. You may have already been unsubscribed.
              </p>
              <Button 
                onClick={() => navigate('/')} 
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Homepage
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Success confirmation
  if (showConfirmation) {
    return (
      <>
        <Helmet>
          <title>Successfully Unsubscribed - Elemental Games</title>
        </Helmet>
        <div className="min-h-screen bg-[#1A103C] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-purple-950/70 p-8 max-w-md w-full rounded-xl border border-green-500/30"
          >
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">You&apos;ve Been Unsubscribed</h1>
              <p className="text-purple-200 mb-4">
                We&apos;re sorry to see you go! <span className="text-yellow-400 font-semibold">{email}</span> has been successfully unsubscribed from our mailing list.
              </p>
              <p className="text-purple-200 mb-6 text-sm">
                If you change your mind, you can always join again from our website.
              </p>
              <Button 
                onClick={() => navigate('/')} 
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Homepage
              </Button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  // Main unsubscribe confirmation page
  return (
    <>
      <Helmet>
        <title>Unsubscribe - Elemental Games</title>
        <meta name="description" content="Unsubscribe from Elemental Games emails" />
      </Helmet>
      <div className="min-h-screen bg-[#1A103C] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-950/70 p-8 max-w-md w-full rounded-xl border border-purple-500/30"
        >
          <div className="text-center mb-6">
            <Mail className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Are You Sure?</h1>
            <p className="text-purple-200">
              You&apos;re about to unsubscribe <span className="text-yellow-400 font-semibold">{email}</span>
            </p>
          </div>
          
          <div className="bg-purple-900/50 p-4 rounded-lg mb-6">
            <div className="mb-3">
              <span className="text-yellow-400 text-lg font-semibold">You&apos;ll miss out on:</span>
            </div>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>Exclusive card reveals before anyone else</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>Early Access Elemental rewards and giveaways</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>Launch date announcements and Early Bird pricing</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>Exclusive Discord community access</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleStaySubscribed}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3"
            >
              Keep Me Subscribed
            </Button>
            
            <Button 
              onClick={handleUnsubscribe}
              disabled={isLoading}
              variant="outline"
              className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-semibold py-3"
            >
              {isLoading ? "Processing..." : "Yes, Unsubscribe Me"}
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-purple-400 hover:text-purple-300 text-sm underline"
            >
              Return to Homepage
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default UnsubscribePage;