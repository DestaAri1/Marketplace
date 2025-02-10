import { GetAllUser, GetAllUserRequest } from "../services/adminServices"

export default function useAdmin() {
    const GetAllUserRequestHook = async() => {
        try {
            var res = await GetAllUserRequest()
            return res
        } catch (error) {
            throw error
        }
    }

    const GetAllUserHook = async() => {
      try {
        var res = await GetAllUser()
        return res
      } catch (error) {
        throw error
      }
    }
  return {
    GetAllUserRequestHook,
    GetAllUserHook,
  }
}

