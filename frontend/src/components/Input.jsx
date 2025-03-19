import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  readOnly = false,
}) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {type === "date" ? (
        <div className="w-full">
          <DatePicker
            selected={value}
            onChange={onChange}
            dateFormat="yyyy-MM-dd"
            className={`w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${classes} 
            ${error ? "border-red-500" : "border-gray-300"} !w-full`}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            wrapperClassName="w-full"
          />
        </div>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={`w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${classes} 
            ${error ? "border-red-500" : "border-gray-300"} `}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
      )}
    </div>
  );
}
