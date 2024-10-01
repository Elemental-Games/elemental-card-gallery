import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const value = {
    user: null,
    signInWithGoogle: () => {},
    signOut: () => {},
    saveDeck: async () => {},
    getDecks: async () => [],
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);