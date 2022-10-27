import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../backend/firebase.config";

const ContextApi = createContext();

export default function AuthContext({ children }) {
  // setup the user
  const [user, setUser] = useState("");

  const registerNewUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser);
      })
      .catch((err) => console.log(err.code));
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe();
  }, []);

  return (
    <>
      <ContextApi.Provider
        value={{ user, registerNewUser, loginUser, logoutUser }}
      >
        {children}
      </ContextApi.Provider>
    </>
  );
}

export const useAuthApi = () => {
  return useContext(ContextApi);
};
