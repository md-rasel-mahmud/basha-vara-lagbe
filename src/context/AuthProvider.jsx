import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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
  const signUpWithEmailPass = (email, pass) =>
    createUserWithEmailAndPassword(auth, email, pass);

  // create user using google popup
  const googleProvider = new GoogleAuthProvider();

  // sign in with google popup
  const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  //manually login
  const manuallyLogin = (email, pass) =>
    signInWithEmailAndPassword(auth, email, pass);

  // updateProfile
  const updateUserProfile = (updateName, photo) =>
    updateProfile(auth.currentUser, {
      displayName: updateName,
      photoURL: photo,
    });

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
    signUpWithEmailPass,
    signInWithGooglePopup,
    logout,
    updateUserProfile,
    manuallyLogin,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
