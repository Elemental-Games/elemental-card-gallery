import { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    // Implement your own authentication logic here
    setError(null);
    // For now, we'll just set a mock user
    setUser({ email, displayName: 'Mock User' });
  };

  const signOut = async () => {
    // Implement your own sign out logic here
    setUser(null);
  };

  const value = {
    user,
    signIn,
    signOut,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);