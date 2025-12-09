import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import AuthContext from "../context/AuthContext";
import type { AuthContextType } from "../context/AuthContext";
import type { User } from "../types/User";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem("token");
    const exp = localStorage.getItem("token_exp");

    if (savedToken && exp && Date.now() > Number(exp)) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_exp");
      return null;
    }
    return savedToken;
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(token: string, user: User) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;

    localStorage.setItem("token", token);
    localStorage.setItem("token_exp", expiry.toString());
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  // Auto logout when token expires
  useEffect(() => {
    if (!token) return;

    const exp = Number(localStorage.getItem("token_exp"));
    const delay = exp - Date.now();

    if (delay <= 0) {
      setTimeout(logout, 0);
      return;
    }

    const timer = setTimeout(logout, delay);
    return () => clearTimeout(timer);
  }, [token]);

  const value: AuthContextType = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
