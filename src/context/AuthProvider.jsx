import { useEffect, useMemo, useState } from "react";
import { AuthContext, STORAGE_KEYS } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.token);
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (error) {
        console.warn("Failed to parse stored user, clearing auth", error);
        localStorage.removeItem(STORAGE_KEYS.token);
        localStorage.removeItem(STORAGE_KEYS.user);
        setToken(null);
        setUser(null);
      }
    }

    setInitializing(false);
  }, []);

  const login = ({ token: nextToken, user: nextUser }) => {
    if (!nextToken || !nextUser) {
      throw new Error("login requires token and user payload");
    }

    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEYS.token, nextToken);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      role: user?.role ?? null,
      isAuthenticated: Boolean(token && user),
      initializing,
      login,
      logout,
    }),
    [token, user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
