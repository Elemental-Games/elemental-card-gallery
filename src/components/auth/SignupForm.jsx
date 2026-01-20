import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import confetti from 'canvas-confetti';
import { CheckCircle } from 'lucide-react';
import { subscribeEmail } from '../../utils/api';
import { trackEmailSignup } from '../../utils/analytics';

const SignupForm = ({ buttonClassName, onSuccess, source = 'signup_form', inputSize = 'default' }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      // Use our centralized subscription function
      const result = await subscribeEmail(email);

      if (result.success) {
        shootConfetti();
        toast.success(result.message || 'Successfully subscribed to our mailing list!');
        setSuccess(true);
        
        // Track email signup
        trackEmailSignup(source, { email });
        
        // Store email in localStorage to pre-fill it on the login page
        localStorage.setItem('signupEmail', email);
        
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        if (result.message && result.message.includes('already subscribed')) {
          toast.info("You're already on our mailing list!");
          setSuccess(true);
        } else {
          toast.error(result.message || 'Failed to subscribe. Please try again.');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-400 mb-2">Thank You!</h3>
        <p className="text-purple-200 mb-6">
          You&apos;re now on our mailing list! You&apos;ll be among the first to know when Elekin launches.
          <br /><span className="text-sm mt-2 block opacity-80">
            A welcome email should arrive in your inbox shortly.
          </span>
        </p>
        <div className="space-y-3">
          <a
            href="https://www.kickstarter.com/projects/elemental-games/elekin"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button 
              className={`w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold py-6 text-md ${buttonClassName}`}
            >
              🔔 Follow us on Kickstarter!
            </Button>
          </a>
        </div>
      </div>
    );
  }

  const isLarge = inputSize === 'large';
  
  return (
    <form onSubmit={handleSubmit} className={`space-y-4 w-full ${isLarge ? 'max-w-2xl' : 'max-w-md'} mx-auto`}>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`w-full border-2 border-yellow-500 ${isLarge ? 'py-8 text-xl' : 'py-6 text-medium'}`}
      />
      <Button 
        type="submit" 
        className={`w-full ${isLarge ? 'py-8 text-xl' : 'py-6 text-medium'} font-semibold ${buttonClassName}`} 
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm; 