import {
  AdjustRoleUser,
  GetAllUser,
  GetAllUserRequest,
} from "../services/adminServices";

export default function useAdmin() {
  const GetAllUserRequestHook = async () => {
    try {
      var res = await GetAllUserRequest();
      return res;
    } catch (error) {
      throw error;
    }
  };

  const GetAllUserHook = async () => {
    try {
      var res = await GetAllUser();
      return res;
    } catch (error) {
      throw error;
    }
  };

  const AdjustRoleUserHook = async (user_id, role) => {
    try {
      var res = await AdjustRoleUser(user_id, role);
      return res;
    } catch (error) {
      throw error;
    }
  };
  return {
    GetAllUserRequestHook,
    GetAllUserHook,
    AdjustRoleUserHook,
  };
}
