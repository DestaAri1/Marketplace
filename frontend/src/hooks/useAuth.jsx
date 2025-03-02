import { useEffect, useState, useCallback, useRef } from "react";
import {
  login as authLogin,
  getUser,
  registration,
} from "../services/authServices";
import { getToken, removeToken, setToken } from "../services/TokenServices";

export default function useAuth() {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getUserCalled = useRef(false);
  const initPromise = useRef(null);

  const fetchUser = useCallback(async () => {
    // If we already have a promise running, return that instead of creating a new one
    if (initPromise.current) {
      return initPromise.current;
    }

    // If we've already successfully fetched the user, don't fetch again
    if (getUserCalled.current && user) {
      return user;
    }

    try {
      getUserCalled.current = true;
      initPromise.current = getUser();
      const userData = await initPromise.current;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      logout();
      return null;
    } finally {
      initPromise.current = null;
    }
  }, [user]);

  const logout = useCallback(() => {
    removeToken();
    setTokenState(null);
    setUser(null);
    getUserCalled.current = false;
  }, []);

  useEffect(() => {
    const currentToken = getToken();

    if (currentToken && !getUserCalled.current) {
      fetchUser().finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]); // Add fetchUser to dependency array

  const login = async (email, password) => {
    try {
      const response = await authLogin(email, password);
      const responseToken = response?.data?.data?.token;

      if (responseToken) {
        setTokenState(responseToken);
        setToken(responseToken); // Save token to storage
        getUserCalled.current = false; // Reset the flag for new login
        // No need to call fetchUser here, it will be handled by useEffect
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await registration(username, email, password);
      const responseToken = response?.data?.data?.token;

      if (responseToken) {
        setTokenState(responseToken);
        setToken(responseToken); // Save token to storage
        getUserCalled.current = false; // Reset the flag for new registration
        // No need to call fetchUser here, it will be handled by useEffect
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    login,
    register,
    logout,
    user,
    token,
    isLoading,
  };
}
