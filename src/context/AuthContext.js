import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("nepalstay_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    const u = { ...userData, loginTime: Date.now() };
    localStorage.setItem("nepalstay_user", JSON.stringify(u));
    setUser(u);
  };

  const signup = (userData) => {
    const u = { ...userData, joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }), loginTime: Date.now() };
    localStorage.setItem("nepalstay_user", JSON.stringify(u));
    // Keep any existing bookings for this email
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("nepalstay_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}