import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const LoginPromptModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Store the current location in localStorage before navigating
    localStorage.setItem('returnTo', window.location.pathname);
    navigate('/login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-purple-950/90 border border-purple-500/30 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400">
            Join the Beta
          </DialogTitle>
          <DialogDescription className="text-purple-200 mt-4">
            To try out the Elekin: Masters of Kinbrold beta, please log in or create an account. 
            Your progress and decks will be saved for future sessions.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-6">
          <Button
            onClick={handleLogin}
            className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
          >
            Log In / Sign Up
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-purple-200 hover:text-purple-100"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPromptModal; 