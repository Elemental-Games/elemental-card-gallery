import { useState, useEffect, createContext, useContext } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase configuration here
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: user.displayName,
      }, { merge: true });
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const signOutUser = () => signOut(auth);

  const saveDeck = async (deckName, deck) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid, 'decks', deckName), { deck });
    } catch (error) {
      console.error('Error saving deck', error);
    }
  };

  const getDecks = async () => {
    if (!user) return [];
    try {
      const decksRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(decksRef);
      if (docSnap.exists()) {
        return docSnap.data().decks || [];
      }
      return [];
    } catch (error) {
      console.error('Error getting decks', error);
      return [];
    }
  };

  const value = {
    user,
    signInWithGoogle,
    signOut: signOutUser,
    saveDeck,
    getDecks,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);