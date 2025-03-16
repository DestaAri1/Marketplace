import { useState } from "react";

export default function useErrorHook() {
  const [errorField, setErrorField] = useState({});
  const [errors, setErrors] = useState();
  const getErrorMessage = (fieldName) => {
    const fieldToErrorMap = errorField;

    const apiFieldName = fieldToErrorMap[fieldName];
    return apiFieldName && errors[apiFieldName];
  };
  return {
    getErrorMessage,
    setErrorField,
    setErrors,
    errors,
  };
}
