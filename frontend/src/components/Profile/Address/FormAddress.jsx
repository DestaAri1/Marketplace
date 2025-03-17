import React from "react";
import Input from "../../Input";
import Select from "../../Select";
import useErrorHook from "../../../hooks/useErrorHook";
import ErrorMessage from "../../ErrorMessage";

export default function FormAddress({
  formData,
  handleChange,
  provinces,
  districts,
  regencies,
  villages,
  errors = {},
  loadingState = {}, // New prop to track loading state
}) { 
  const { getErrorMessage, setErrorField, setErrors } = useErrorHook();
  React.useEffect(() => {
    setErrorField({
      sender: "Sender",
      receiver: "Recipient",
      province: "Province",
      regency: "Regency",
      district: "District",
      village: "Village",
      description: "Details",
      status: "Status",
    });
    setErrors(errors);
  }, [errors, setErrorField, setErrors]);

  const handleFieldChange = (e) => {
    handleChange(e);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <div>
          <Input
            type={"text"}
            name={"sender"}
            value={formData.sender || ""}
            placeholder={"Input the sender name"}
            label={"Sender"}
            onChange={handleFieldChange}
          />
          <ErrorMessage name="sender" getErrorMessage={getErrorMessage} />
        </div>

        <div>
          <Select
            label={"Province"}
            onChange={handleFieldChange}
            value={formData.province || ""}
            name={"province"}
            item={provinces.length > 0 ? provinces : []}
            disabled={loadingState.provinces}
          />
          <ErrorMessage name="province" getErrorMessage={getErrorMessage} />
        </div>

        <div>
          <Select
            label={"District"}
            onChange={handleFieldChange}
            value={formData.district || ""}
            name={"district"}
            item={districts || []}
            disabled={loadingState.districts || !formData.regency}
          />
          <ErrorMessage name="district" getErrorMessage={getErrorMessage} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            type={"text"}
            name={"receiver"}
            value={formData.receiver || ""}
            placeholder={"Input the receiver name"}
            label={"Receiver"}
            onChange={handleFieldChange}
          />
          <ErrorMessage name="receiver" getErrorMessage={getErrorMessage} />
        </div>

        <div>
          <Select
            label={"Regency"}
            onChange={handleFieldChange}
            value={formData.regency || ""}
            name={"regency"}
            item={regencies || []}
            disabled={loadingState.regencies || !formData.province}
          />
          <ErrorMessage name="regency" getErrorMessage={getErrorMessage} />
        </div>

        <div>
          <Select
            label={"Village"}
            onChange={handleFieldChange}
            value={formData.village || ""}
            name={"village"}
            item={villages || []}
            disabled={loadingState.villages || !formData.district}
          />
          <ErrorMessage name="village" getErrorMessage={getErrorMessage} />
        </div>
      </div>

      <div className="mt-4 col-span-2">
        <label
          htmlFor="Detail"
          className="block text-sm font-medium text-gray-700"
        >
          Detail Address
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleFieldChange}
          rows="3"
          className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
        <ErrorMessage name="description" getErrorMessage={getErrorMessage} />
      </div>

      <div className="col-span-2 flex items-center mt-2">
        <span className="mr-2 text-sm font-medium text-gray-700">
          Set as main address?
        </span>
        <div
          className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
            formData.status ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() =>
            handleFieldChange({
              target: { name: "status", value: !formData.status },
            })
          }
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              formData.status ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
        {getErrorMessage("status") && (
          <div className="text-red-500 text-xs ml-2 font-medium">
            {getErrorMessage("status")}
          </div>
        )}
      </div>
    </div>
  );
}
