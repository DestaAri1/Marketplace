import {login as authLogin, registration} from '../services/authServices';

export default function useAuth() {
  const login = async (email, password) => {
      try {
        const response = await authLogin(email, password);
      //   setTokenState(newToken); 
      //   setUser(userData);
        
        return response;
      } catch (error) {
        throw error;
      }
    };

  const register = async(username, email, password) => {
    try {
      const response = await registration(username, email, password);
    //   setTokenState(newToken); 
    //   setUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }
  return {
    login,
    register
    }
}
