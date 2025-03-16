import React from "react";
import Button from "../Button";
import AddressList from "./Address/AddressList";

export default function AddressBox({ onClick, address, onUpdate, onDelete }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Address</h2>
        <Button
          type={"button"}
          classes={
            "bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-sm"
          }
          base=""
          name={"Add Address"}
          onClick={onClick}
        />
      </div>

      <AddressList
        address={address}
        onClick={onClick}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}
