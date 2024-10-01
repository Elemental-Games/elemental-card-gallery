import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';

const Auth = () => {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <div className="p-4 bg-white bg-opacity-10 rounded-lg shadow-lg">
      {user ? (
        <div>
          <p className="mb-4">Welcome, {user.displayName}!</p>
          <Button onClick={signOut} className="w-full bg-accent text-white">Sign Out</Button>
        </div>
      ) : (
        <Button onClick={signInWithGoogle} className="w-full bg-red-600 text-white">
          Sign in with Google
        </Button>
      )}
    </div>
  );
};

export default Auth;