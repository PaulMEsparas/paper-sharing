import { createContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const signOutUser = () => signOut(auth);

  const value = {
    user,
    signOut: signOutUser,
  };

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });

    return () => unsub();
  }, [auth]);

  return (
    user && (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
  );
};
