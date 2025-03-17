import React from "react";
import Input from "../Input";
import ErrorMessage from "../ErrorMessage";
import useErrorHook from "../../hooks/useErrorHook";

export default function FormCategory({ newName, onChange, errors = {} }) {
  const { getErrorMessage, setErrorField, setErrors } = useErrorHook();
  React.useEffect(() => {
    setErrorField({
      name: "Name",
    });
    setErrors(errors);
  }, [errors, setErrorField, setErrors]);

  return (
    <div>
      <Input
        type={"text"}
        value={newName}
        onChange={onChange}
        placeholder={"Enter category name"}
        label={"Name"}
      />
      <ErrorMessage name={"name"} getErrorMessage={getErrorMessage} />
    </div>
  );
}
