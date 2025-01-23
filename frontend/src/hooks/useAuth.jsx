import {login as authLogin} from '../services/authServices';

export default function useAuth() {
  const login = async (email, password) => {
      try {
        const response = await authLogin(email, password);
        // const { token: newToken, user: userData } = response.data;
        
      //   setToken(newToken);
      //   setTokenState(newToken);
      //   setUser(userData);
        console.log(response.data.data);
        
        return response;
      } catch (error) {
        throw error;
      }
    };
  return {
    login
    }
}
