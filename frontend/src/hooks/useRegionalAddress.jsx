import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { regionalAddressAPI } from "../services/addressServices";

export default function useRegionalAddress() {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [villages, setVillages] = useState(null);
  const isFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  // Callback for API calls with error handling
  const handleAddressCall = useCallback(async (apiFunction) => {
    setIsLoading(true);
    try {
      const response = await apiFunction();
      return response?.data?.data || [];
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Operation failed";
      toast.error(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reset functions for each level - explicitly set to null
  const resetRegencies = useCallback(() => {
    setRegencies(null);
  }, []);

  const resetDistricts = useCallback(() => {
    setDistricts(null);
  }, []);

  const resetVillages = useCallback(() => {
    setVillages(null);
  }, []);

  // Reset all dropdowns at once
  const resetAll = useCallback(() => {
    resetRegencies();
    resetDistricts();
    resetVillages();
  }, [resetRegencies, resetDistricts, resetVillages]);

  // Fetch provinces
  const fetchProvinces = useCallback(async () => {
    const success = await handleAddressCall(() => regionalAddressAPI.getProvince());
    if (success.length > 0) {
      setProvinces(success);
      isFetched.current = true;
    }
    return success;
  }, [handleAddressCall]);

  // Fetch regencies based on province ID
  const fetchRegencies = useCallback(
    async (provinceId) => {
      if (!provinceId) {
        resetAll(); // Reset all dependent fields if provinceId is empty
        return;
      }

      const success = await handleAddressCall(() =>
        regionalAddressAPI.getRegencies(provinceId)
      );
      if (success.length > 0) {
        setRegencies(success);
      } else {
        setRegencies([]); // Set to empty array when API returns data but it's empty
      }
      return success;
    },
    [handleAddressCall, resetAll]
  );

  // Fetch districts based on regency ID
  const fetchDistricts = useCallback(
    async (regencyId) => {
      if (!regencyId) {
        resetDistricts();
        resetVillages(); // Also reset villages
        return;
      }

      const success = await handleAddressCall(() =>
        regionalAddressAPI.getDistricts(regencyId)
      );
      if (success.length > 0) {
        setDistricts(success);
      } else {
        setDistricts([]); // Set to empty array when API returns data but it's empty
      }
      return success;
    },
    [handleAddressCall, resetDistricts, resetVillages]
  );

  // Fetch villages based on district ID
  const fetchVillages = useCallback(
    async (districtId) => {
      if (!districtId) {
        resetVillages();
        return;
      }

      const success = await handleAddressCall(() =>
        regionalAddressAPI.getVillages(districtId)
      );
      if (success.length > 0) {
        setVillages(success);
      } else {
        setVillages([]); // Set to empty array when API returns data but it's empty
      }
      return success;
    },
    [handleAddressCall, resetVillages]
  );

  return {
    provinces,
    regencies,
    districts,
    villages,
    isLoading,
    isFetched,
    fetchProvinces,
    fetchRegencies,
    fetchDistricts,
    fetchVillages,
    resetRegencies,
    resetDistricts,
    resetVillages,
    resetAll,
  };
}
