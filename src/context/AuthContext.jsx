import React, { createContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in from localStorage
    try {
      return localStorage.getItem("isLoggedIn") === "true";
    } catch {
      return false;
    }
  });
  
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password, remember = true) => {
    // Default credentials - you can add more users here
    const defaultUsers = [
      { email: "admin@mindpower.com", password: "admin123", name: "Admin User", role: "admin" },
      { email: "user@mindpower.com", password: "user123", name: "Standard User", role: "user" },
      // Add more default users if needed
    ];

    // Normalize email to lowercase for case-insensitive matching
    const normalizedEmail = email.toLowerCase().trim();
    const user = defaultUsers.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (user) {
      const userData = { email: user.email, name: user.name, role: user.role };
      setIsLoggedIn(true);
      setUser(userData);
      if (remember) {
        try {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(userData));
        } catch {
          // ignore localStorage errors
        }
      }
      return { success: true, user: userData };
    } else {
      return { success: false, error: "Invalid email or password" };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
    }),
    [isLoggedIn, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
