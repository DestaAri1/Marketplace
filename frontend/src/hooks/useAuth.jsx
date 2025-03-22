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
  const userFetched = useRef(false);

  const fetchUser = useCallback(
    async (force = false) => {
      if (!getToken()) {
        setIsLoading(false);
        return null;
      }

      if (user && userFetched.current && !force) {
        setIsLoading(false);
        return user;
      }

      if (fetchPromise.current) {
        return fetchPromise.current;
      }

      try {
        setIsLoading(true);
        fetchPromise.current = getUser();
        const userData = await fetchPromise.current;

        if (mounted.current) {
          setUser(userData);
          userFetched.current = true;
        }

        return userData;
      } catch (error) {
        console.error("Error fetching user:", error);
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
    },
    [user]
  );


  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    userFetched.current = false;
    setIsLoading(false);
  }, []);

  useEffect(() => {
    mounted.current = true;

    const initAuth = async () => {
      if (getToken() && !userFetched.current) {
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
          // Force a refresh after login
          await fetchUser(true);
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
          // Force a refresh after registration
          await fetchUser(true);
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

  // Memoize return value to prevent unnecessary re-renders
  const authValue = useMemo(
    () => ({
      login,
      register,
      logout,
      user,
      setUser, // Export setUser function
      isLoading,
      fetchUser,
    }),
    [login, register, logout, fetchUser, user, isLoading]
  );

  return authValue;
}
