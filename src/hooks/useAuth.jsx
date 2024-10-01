import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    // Placeholder for Google Sign-In logic
    console.log('Sign in with Google clicked');
    // For now, let's just set a dummy user
    setUser({ name: 'Dummy User', email: 'dummy@example.com' });
  };

  const signOut = () => {
    // Placeholder for sign out logic
    setUser(null);
  };

  const value = {
    user,
    signInWithGoogle,
    signOut,
    saveDeck: async () => {},
    getDecks: async () => [],
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};