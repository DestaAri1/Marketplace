import { useEffect, useState, useCallback, useRef } from 'react';
import { login as authLogin, getUser, registration } from '../services/authServices';
import { getToken, removeToken, setToken } from '../services/TokenServices';

export default function useAuth() {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getUserCalled = useRef(false);

  const fetchUser = useCallback(async () => {
    if (getUserCalled.current || !token) return;
    getUserCalled.current = true;
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const logout = useCallback(() => {
    removeToken();
    setTokenState(null);
    setUser(null);
    getUserCalled.current = false;
  }, []);

  useEffect(() => {
    if (token) {
      getUserCalled.current = false; // Reset flag sebelum memanggil fetchUser
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [token, fetchUser]);

  const login = async (email, password) => {
    try {
      const response = await authLogin(email, password);
      const responseToken = response?.data?.data?.token;
      
      if (responseToken) {
        setTokenState(responseToken);
        setToken(responseToken);
        getUserCalled.current = false; // Reset flag agar useEffect bisa memanggil fetchUser
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
        setToken(responseToken);
        getUserCalled.current = false; // Reset flag agar useEffect bisa memanggil fetchUser
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
