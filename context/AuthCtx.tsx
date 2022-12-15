import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

// --- Services ---
import { auth } from "../services/client";
import { getCurrentUser } from "../services/firebaseFunctions";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// --- Types ---
import type { UserInfo as User } from "firebase/auth";
import { UserInfoType, AuthContextValueType } from "../types";

export const AuthContext = React.createContext({} as AuthContextValueType);

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [infoUser, setInfoUser] = useState<UserInfoType | null>();
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      if (!user?.uid) {
        setInfoUser(null);
        setLoading(false);
        return;
      }
      getCurrentUser(user.uid)
        .then((data) => {
          setInfoUser(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    infoUser,
    isAuthenticated: Boolean(infoUser),
    company: infoUser?.route,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
