import React from "react";
import DashboardTemplate from "../../Dashboard/DashboardTemplate";
import DiscountList from "../../../components/Seller/Discount/DiscountList";

export default function Discount() {
  return (
    <DashboardTemplate
      title="Discount"
      showButton={true}
      buttonTitle="Add Discount"
    >
      {/* <div className="mb-4 flex items-center">
        <span className="mr-2">Filter:</span>
        <button
          className={`px-3 py-1 mr-2 rounded ${
            statusFilter ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setStatusFilter(true)}
        >
          Active
        </button>
        <button
          className={`px-3 py-1 rounded ${
            !statusFilter ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setStatusFilter(false)}
        >
          Inactive
        </button>
      </div> */}
      <DiscountList />
    </DashboardTemplate>
  );
}
