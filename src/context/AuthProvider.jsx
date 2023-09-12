import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  // create user using email and password
  const signInWithEmailPass = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  // create user using google popup
  const googleProvider = new GoogleAuthProvider();

  const signInWithGooglePopup = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // updateProfile
  const updateUserProfile = (updateName, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: updateName,
      photoURL: photo,
    });
  };

  //observers the state of the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  //logout
  const logout = () => {
    return signOut(auth);
  };

  const data = {
    user,
    signInWithEmailPass,
    signInWithGooglePopup,
    logout,
    updateUserProfile,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
