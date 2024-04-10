import { createContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/Firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  signOut: () => {},
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const signOutUser = () => signOut(auth);
  const navigate = useNavigate();
  const value = {
    user,
    signOut: signOutUser,
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
      return () => unsub();
    });
  }, [auth]);

  return (
    user && (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
  );
}

export default AuthProvider;
