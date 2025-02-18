import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SignupForm = ({ buttonClassName }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Store email in localStorage to pre-fill it on the login page
      localStorage.setItem('signupEmail', email);
      
      // Navigate to login page with sign-up mode
      navigate('/login', { state: { mode: 'signup' } });
      
      toast.success("Let's complete your account setup!");
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border-2 border-yellow-500"
      />
      <Button 
        type="submit" 
        className={`w-full ${buttonClassName}`} 
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm; 