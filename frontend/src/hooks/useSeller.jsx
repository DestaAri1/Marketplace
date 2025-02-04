import { UpgradeSeller } from '../services/sellerServices'

export default function useSeller() {
    const UpgradeSellerHook = async() => {
        try {
            const response = await UpgradeSeller()
            return response
        } catch (error) {
            throw error
        }
    }
  return {
    UpgradeSellerHook,
  }
}
