import { GetAllUser } from "../services/adminServices"

export default function useAdmin() {
    const GetAllUserHook = async() => {
        try {
            var res = await GetAllUser()
            return res
        } catch (error) {
            throw error
        }
    }
  return {
    GetAllUserHook,
  }
}
