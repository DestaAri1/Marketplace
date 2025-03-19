import React, { useState } from "react";
import FormBiodata from "./Biodata/FormBiodata";
import useAuth from "../../hooks/useAuth";

export default function Biodata() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthday: "",
    phone_number: "",
    gender: "",
  });

  const handleSumbitUpdateBio = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Biodata</h2>
      <FormBiodata
        user={user}
        formData={formData}
        setFormData={setFormData}
        onConfirm={handleSumbitUpdateBio}
      />
    </div>
  );
}
