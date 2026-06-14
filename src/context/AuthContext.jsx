import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 30-Minute Timeout Logic
  useEffect(() => {
    const checkTimeout = () => {
      const loginTime = localStorage.getItem('adminLoginTime');
      if (currentUser) {
        if (!loginTime) {
          logout();
        } else {
          const timeElapsed = Date.now() - parseInt(loginTime);
          if (timeElapsed >= 30 * 60 * 1000) { // 30 minutes in ms
            logout();
            localStorage.removeItem('adminLoginTime');
          }
        }
      }
    };

    // Check immediately and every minute
    checkTimeout();
    const interval = setInterval(checkTimeout, 60000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
