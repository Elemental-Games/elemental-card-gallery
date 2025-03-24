import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import Head from 'next/head';

const UnsubscribePage = () => {
  const router = useRouter();
  const { email, token } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [subscriberData, setSubscriberData] = useState(null);
  const [validToken, setValidToken] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Wait for router to be ready with query params
    if (!router.isReady) return;
    
    const validateSubscriber = async () => {
      if (!email) return;

      try {
        // Fetch subscriber to verify
        const { data, error } = await supabase
          .from('subscribers')
          .select('*')
          .eq('email', email)
          .single();

        if (error) {
          console.error('Error fetching subscriber:', error);
          return;
        }

        setSubscriberData(data);
        
        // If token is provided, verify it
        if (token) {
          if (!data.unsubscribe_token || data.unsubscribe_token === token) {
            setValidToken(true);
          } else {
            console.error('Invalid unsubscribe token');
          }
        } else {
          // No token provided, but we found the subscriber
          // Allow unsubscribe without token validation for now
          setValidToken(true);
        }
      } catch (err) {
        console.error('Exception fetching subscriber:', err);
      } finally {
        setIsInitialized(true);
      }
    };

    validateSubscriber();
  }, [email, token, router.isReady]);

  const handleStaySubscribed = () => {
    toast.success("Thank you for staying with us! We&apos;ll keep you updated with exclusive content.");
    router.push('/');
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

  // Show loading state while we initialize
  if (!isInitialized && router.isReady) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-purple-950/70 p-8 max-w-md mx-auto border border-purple-500/30">
          <h1 className="text-2xl font-bold text-white mb-4 text-center">Loading...</h1>
          <p className="text-purple-200 mb-6 text-center">
            Please wait while we process your request.
          </p>
        </Card>
      </div>
    );
  }

  if (!email && router.isReady) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-purple-950/70 p-8 max-w-md mx-auto border border-purple-500/30">
          <h1 className="text-2xl font-bold text-white mb-4 text-center">Invalid Unsubscribe Link</h1>
          <p className="text-purple-200 mb-6 text-center">
            The unsubscribe link you followed appears to be invalid or missing an email address.
          </p>
          <Button 
            onClick={() => router.push('/')} 
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold"
          >
            Return to Homepage
          </Button>
        </Card>
      </div>
    );
  }

  if (!validToken && token && isInitialized) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-purple-950/70 p-8 max-w-md mx-auto border border-purple-500/30">
          <h1 className="text-2xl font-bold text-white mb-4 text-center">Invalid Unsubscribe Token</h1>
          <p className="text-purple-200 mb-6 text-center">
            The unsubscribe link you followed contains an invalid token. Please use the link from the most recent email.
          </p>
          <Button 
            onClick={() => router.push('/')} 
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold"
          >
            Return to Homepage
          </Button>
        </Card>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-purple-950/70 p-8 max-w-md mx-auto border border-purple-500/30">
          <h1 className="text-2xl font-bold text-white mb-4 text-center">You&apos;ve Been Unsubscribed</h1>
          <p className="text-purple-200 mb-6 text-center">
            We&apos;re sorry to see you go! You&apos;ve been successfully unsubscribed from our mailing list.
          </p>
          <p className="text-purple-200 mb-6 text-center">
            If you change your mind, you can always join again from our website.
          </p>
          <Button 
            onClick={() => router.push('/')} 
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold"
          >
            Return to Homepage
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Unsubscribe - Elemental Games</title>
        <meta name="description" content="Unsubscribe from Elemental Games emails" />
      </Head>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-16"
      >
        <Card className="bg-purple-950/70 p-8 max-w-md mx-auto border border-purple-500/30">
          <h1 className="text-2xl font-bold text-center text-white mb-2">Are You Sure?</h1>
          <div className="mb-6 text-center">
            <span className="text-yellow-400 text-lg">You&apos;ll miss out on:</span>
          </div>
          
          <div className="bg-purple-900/50 p-4 rounded-md mb-6">
            <ul className="space-y-2 text-purple-200">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>Exclusive card reveals before anyone else</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>Early access to pre-order opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>Special promotions only for our subscribers</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>Updates on game features and launch timeline</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-4">
            <Button 
              onClick={handleStaySubscribed}
              className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all"
            >
              No, Keep Me Subscribed!
            </Button>
            
            <Button 
              onClick={handleUnsubscribe}
              disabled={isLoading}
              className="bg-transparent hover:bg-purple-900/50 text-purple-300 text-sm py-2 border border-purple-500/30"
            >
              {isLoading ? "Processing..." : "Yes, Unsubscribe Me"}
            </Button>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default UnsubscribePage; 