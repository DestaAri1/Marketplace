import { useCallback, useRef, useState } from "react";
import { addressAPI } from "../services/addressServices";

export default function useAddress() {
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFetched = useRef(false);

  const fetchAddress = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        data: { data = [] },
      } = await addressAPI.getAddress();
      setAddress(data || [])
      isFetched.current = true;
    } catch (error) {
      console.error("[useCart] Error fetching cart:", error);
      isFetched.current = true;
    } finally {
      setIsLoading(false);
    }
  },[]);
  return {
    address,
    isFetched,
    isLoading,
    fetchAddress,
  };
}
