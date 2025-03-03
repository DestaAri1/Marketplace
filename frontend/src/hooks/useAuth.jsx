import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  login as authLogin,
  getUser,
  registration,
} from "../services/authServices";
import { getToken, removeToken } from "../services/TokenServices";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchPromise = useRef(null);
  const mounted = useRef(false);

  const fetchUser = useCallback(async () => {
    if (!getToken()) {
      setIsLoading(false);
      return null;
    }

    if (fetchPromise.current) {
      return fetchPromise.current;
    }

    try {
      fetchPromise.current = getUser();
      const userData = await fetchPromise.current;
      if (mounted.current) {
        setUser((prev) => {
          // Hanya update jika data benar-benar berbeda
          if (JSON.stringify(prev) !== JSON.stringify(userData)) {
            return userData;
          }
          return prev;
        });
      }
      return userData;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (mounted.current) {
        logout();
      }
      return null;
    } finally {
      fetchPromise.current = null;
      if (mounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    mounted.current = true;

    const initAuth = async () => {
      if (getToken()) {
        await fetchUser();
      } else {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      mounted.current = false;
    };
  }, [fetchUser]);

  const login = useCallback(
    async (email, password) => {
      setIsLoading(true);
      try {
        const response = await authLogin(email, password);
        if (mounted.current) {
          await fetchUser();
        }
        return response;
      } finally {
        if (mounted.current) {
          setIsLoading(false);
        }
      }
    },
    [fetchUser]
  );

  const register = useCallback(
    async (username, email, password) => {
      setIsLoading(true);
      try {
        const response = await registration(username, email, password);
        if (mounted.current) {
          await fetchUser();
        }
        return response;
      } finally {
        if (mounted.current) {
          setIsLoading(false);
        }
      }
    },
    [fetchUser]
  );

  // Memoize return value untuk mencegah re-render yang tidak perlu
  const authValue = useMemo(
    () => ({
      login,
      register,
      logout,
      user,
      isLoading,
    }),
    [login, register, logout, user, isLoading]
  );

  return authValue;
}
