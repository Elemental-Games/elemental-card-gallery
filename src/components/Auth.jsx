import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';

const Auth = () => {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <div className="p-4 bg-white bg-opacity-10 rounded-lg shadow-lg">
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <Button onClick={signOut} variant="outline" className="mt-2">Sign Out</Button>
        </div>
      ) : (
        <Button onClick={signInWithGoogle} variant="outline">
          Sign In with Google
        </Button>
      )}
    </div>
  );
};

export default Auth;