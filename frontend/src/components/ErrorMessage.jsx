import React from "react";

export default function ErrorMessage({ name, getErrorMessage }) {
  const errorMessage = getErrorMessage(name);
  return errorMessage ? (
    <div className="text-red-500 text-xs mt-1 mb-[-15px] font-medium">
      {errorMessage}
    </div>
  ) : null;
}
