import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import confetti from 'canvas-confetti';
import { CheckCircle } from 'lucide-react';

const SignupForm = ({ buttonClassName }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Insert into subscribers table
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email, subscribed_at: new Date() }]);

      if (error) {
        console.error('Error adding subscriber:', error);
        if (error.code === '23505') { // Unique violation (email already exists)
          toast.info("You're already on our mailing list!");
          setSuccess(true);
        } else {
          toast.error('Failed to subscribe. Please try again.');
          setIsLoading(false);
          return;
        }
      } else {
        shootConfetti();
        toast.success('Successfully subscribed to our mailing list!');
        setSuccess(true);
      }

      // Store email in localStorage to pre-fill it on the login page
      localStorage.setItem('signupEmail', email);      
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignUp = () => {
    navigate('/login', { state: { mode: 'signup' } });
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-400 mb-2">Thank You!</h3>
        <p className="text-purple-200 mb-6">
          You&apos;re now on our mailing list and will be the first to know when Elekin launches!
        </p>
        <div className="space-y-3">
          <Button 
            onClick={goToSignUp}
            className={`w-full bg-yellow-500 hover:bg-yellow-400 text-yellow-400 font-semibold py-6 text-md ${buttonClassName}`}
          >
            Create an Account for More Early Benefits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border-2 border-yellow-500 py-6 text-medium"
      />
      <Button 
        type="submit" 
        className={`w-full py-6 text-medium font-semibold ${buttonClassName}`} 
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm; 