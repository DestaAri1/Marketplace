import React, { lazy, useState, Suspense, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useBiodata from "../../hooks/useBiodata";

const FormBiodata = lazy(() => import("./Biodata/FormBiodata"));

export default function Biodata() {
  const { user, setUser } = useAuth();
  const { handleUpdateBiodata, isLoading } = useBiodata();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthday: "",
    phone_number: "",
    gender: "",
    profile_image: null,
  });

  // Initialize form data whenever user changes
  useEffect(() => {
    if (user?.id) {
      setFormData({
        username: user?.username || "",
        email: user?.email || "",
        birthday: user?.biodata?.birthday || "",
        phone_number: user?.biodata?.phone_number || "",
        gender: user?.biodata?.gender || "",
        image: user?.biodata?.image || null,
      });
    }
  }, [user]);

  const handleSubmitUpdateBio = async (data) => {
    if (!user?.id) {
      console.error("User ID not available");
      return false;
    }

    const success = await handleUpdateBiodata(user.id, data);

    if (success) {
      // Manual update untuk komponen ini
      // (Ini memastikan bahwa jika ada caching di level komponen, itu diperbarui)
      if (data.profile_image) {
        // Untuk gambar, perlu reader untuk mendapatkan data URL sementara
        const reader = new FileReader();
        reader.onload = (e) => {
          const tempImageUrl = e.target.result;

          // Update local state
          setUser((prevUser) => ({
            ...prevUser,
            username: data.username || prevUser.username,
            biodata: {
              ...prevUser.biodata,
              birthday: data.birthday || prevUser.biodata?.birthday,
              phone_number: data.phone_number || prevUser.biodata?.phone_number,
              gender: data.gender || prevUser.biodata?.gender,
              // Gunakan data URL sementara untuk image
              // Ini hanya untuk preview UI, bukan nilai sebenarnya dari server
              tempImagePreview: tempImageUrl,
            },
          }));
        };
        reader.readAsDataURL(data.profile_image);
      } else {
        // Update tanpa gambar
        setUser((prevUser) => ({
          ...prevUser,
          username: data.username || prevUser.username,
          biodata: {
            ...prevUser.biodata,
            birthday: data.birthday || prevUser.biodata?.birthday,
            phone_number: data.phone_number || prevUser.biodata?.phone_number,
            gender: data.gender || prevUser.biodata?.gender,
          },
        }));
      }
    }

    return success;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Biodata</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <FormBiodata
          user={user}
          formData={formData}
          setFormData={setFormData}
          onConfirm={handleSubmitUpdateBio}
          isLoading={isLoading}
        />
      </Suspense>
    </div>
  );
}
