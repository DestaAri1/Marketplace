import { useEffect, useState } from "react";
import useAddress from "./useRegionalAddress";

export default function useAddressFormLogic(formData, setFormData, isOpen) {
  const {
    provinces,
    regencies,
    districts,
    villages,
    fetchProvinces,
    fetchRegencies,
    fetchDistricts,
    fetchVillages,
    resetRegencies,
    resetDistricts,
    resetVillages,
    isFetched,
  } = useAddress();

  // Keep track of which data has been loaded
  const [loadedData, setLoadedData] = useState({
    provinceId: null,
    regencyId: null,
    districtId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Handle cascading dropdowns
    if (name === "province") {
      if (value) {
        // Only fetch if different from what's already loaded
        if (value !== loadedData.provinceId) {
          fetchRegencies(value);
          setLoadedData((prev) => ({
            ...prev,
            provinceId: value,
            regencyId: null,
            districtId: null,
          }));
        }
      } else {
        resetRegencies();
        resetDistricts();
        resetVillages();
        setLoadedData({ provinceId: null, regencyId: null, districtId: null });
      }
      // Always reset dependent fields
      setFormData((prev) => ({
        ...prev,
        regency: "",
        district: "",
        village: "",
      }));
    } else if (name === "regency") {
      if (value) {
        // Only fetch if different from what's already loaded
        if (value !== loadedData.regencyId) {
          fetchDistricts(value);
          setLoadedData((prev) => ({
            ...prev,
            regencyId: value,
            districtId: null,
          }));
        }
      } else {
        resetDistricts();
        resetVillages();
        setLoadedData((prev) => ({
          ...prev,
          regencyId: null,
          districtId: null,
        }));
      }
      // Always reset dependent fields
      setFormData((prev) => ({
        ...prev,
        district: "",
        village: "",
      }));
    } else if (name === "district") {
      if (value) {
        // Only fetch if different from what's already loaded
        if (value !== loadedData.districtId) {
          fetchVillages(value);
          setLoadedData((prev) => ({ ...prev, districtId: value }));
        }
      } else {
        resetVillages();
        setLoadedData((prev) => ({ ...prev, districtId: null }));
      }
      // Reset dependent field
      setFormData((prev) => ({
        ...prev,
        village: "",
      }));
    }
  };

  const resetForm = () => {
    setFormData({}); // Reset to empty object
    setLoadedData({ provinceId: null, regencyId: null, districtId: null });
  };

  // Initial data loading - only once when component mounts
  useEffect(() => {
    if (!isFetched.current) {
      fetchProvinces();
    }
  }, [fetchProvinces, isFetched]);

  // Initial load of dependent data if formData already has values
  useEffect(() => {
    // This effect runs only once after mount to setup initial state
    if (isOpen) {
      if (formData.province && formData.province !== loadedData.provinceId) {
        fetchRegencies(formData.province);
        setLoadedData((prev) => ({ ...prev, provinceId: formData.province }));

        if (formData.regency && formData.regency !== loadedData.regencyId) {
          fetchDistricts(formData.regency);
          setLoadedData((prev) => ({ ...prev, regencyId: formData.regency }));

          if (
            formData.district &&
            formData.district !== loadedData.districtId
          ) {
            fetchVillages(formData.district);
            setLoadedData((prev) => ({
              ...prev,
              districtId: formData.district,
            }));
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // Only run when modal opens

  return {
    provinces,
    regencies,
    districts,
    villages,
    loadedData,
    handleChange,
    resetForm,
    setLoadedData,
  };
}
