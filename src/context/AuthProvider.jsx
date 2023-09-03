import { createContext } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
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

  const data = {
    user: "rasel",
    signInWithEmailPass,
    signInWithGooglePopup,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
