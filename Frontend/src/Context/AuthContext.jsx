import React, { createContext, useContext, useState, useEffect } from 'react';
import { LogoutAPI, VerifySessionAPI } from '../api/AuthenticationAPI';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        const res = await VerifySessionAPI();

        if (res && res.success) {
          setUser(res.user);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error("Session verification failed:", e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUserSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      const res = await LogoutAPI();
      if (res && res.success) {
        console.log("Cookie wiped successfully on the server");
      } else {
        console.warn("Server logout response unsuccessful, clearing local state anyway");
      }
    } catch (e) {
      console.error("Network error during server logout:", e);
    } finally {
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bgclr">
        <p className="text-white text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider setup");
  }
  return context;
};
