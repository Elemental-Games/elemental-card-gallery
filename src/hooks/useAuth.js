import { useState, useEffect, createContext, useContext } from 'react';
import { Auth } from 'aws-amplify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (err) {
      setUser(null);
    }
  }

  async function signInWithGoogle() {
    try {
      await Auth.federatedSignIn({ provider: 'Google' });
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  }

  async function signInWithFacebook() {
    try {
      await Auth.federatedSignIn({ provider: 'Facebook' });
    } catch (error) {
      console.error('Error signing in with Facebook', error);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out', error);
    }
  }

  const value = {
    user,
    signInWithGoogle,
    signInWithFacebook,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);