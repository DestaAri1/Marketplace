import React from "react";

export default function Input({
  label,
  type,
  id,
  placeholder,
  classes,
  name,
  value,
  onChange,
  error,
}) {
  return (
    <>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${classes} 
            ${error ? "border-red-500" : "border-gray-300"}`}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
