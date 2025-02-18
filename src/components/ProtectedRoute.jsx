import { useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { Navigate } from 'react-router-dom';
import LoginPromptModal from './auth/LoginPromptModal';

const ProtectedRoute = ({ children }) => {
  const user = useUser();
  const [showLoginPrompt, setShowLoginPrompt] = useState(!user);

  if (!user && !showLoginPrompt) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return (
      <>
        <LoginPromptModal 
          isOpen={showLoginPrompt} 
          onClose={() => setShowLoginPrompt(false)} 
        />
        <div className="min-h-screen bg-[#1A103C] opacity-50" />
      </>
    );
  }

  return children;
};

export default ProtectedRoute; 