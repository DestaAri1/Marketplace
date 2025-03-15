import React from "react";
import Input from "../../Input";
import Select from "../../Select";

export default function FormAddress({
  formData,
  handleChange,
  provinces,
  districts,
  regencies,
  villages,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <Input
          type={"text"}
          name={"sender"}
          value={formData.sender || ""}
          placeholder={"Input the sender name"}
          label={"Sender"}
          onChange={handleChange}
        />
        <Select
          label={"Province"}
          onChange={handleChange}
          value={formData.province || ""}
          name={"province"}
          item={provinces.length > 0 ? provinces : []}
        />
        <Select
          label={"District"}
          onChange={handleChange}
          value={formData.district || ""}
          name={"district"}
          item={districts || []}
        />
      </div>
      <div className="space-y-4">
        <Input
          type={"text"}
          name={"receiver"}
          value={formData.receiver || ""}
          placeholder={"Input the receiver name"}
          label={"Receiver"}
          onChange={handleChange}
        />
        <Select
          label={"Regency"}
          onChange={handleChange}
          value={formData.regency || ""}
          name={"regency"}
          item={regencies || []}
        />
        <Select
          label={"Village"}
          onChange={handleChange}
          value={formData.village || ""}
          name={"village"}
          item={villages || []}
        />
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
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
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
            handleChange({
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
      </div>
    </div>
  );
}
