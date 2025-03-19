import React, { useEffect, useState } from "react";
import Input from "../../Input.jsx";
import Select from "../../Select.jsx";

export default function FormBiodata({
  user,
  formData,
  setFormData,
  onConfirm,
}) {
  const [previewImage, setPreviewImage] = useState(null);
  // Default user avatar
  const defaultAvatar =
    "https://via.placeholder.com/150/cccccc/666666?text=User";

  const gender = [
    { id: 0, name: "Laki-Laki" },
    { id: 1, name: "Perempuan" },
  ];

  useEffect(() => {
    if (user?.id) {
      // Initialize all form fields to prevent controlled/uncontrolled switching
      setFormData({
        name: user.username || "",
        email: user.email || "",
        birthday: user.birthday || "",
        phone_number: user.phone_number || "",
        gender: user.gender || "",
        profile_image: user.profile_image || null,
      });

      // If user has a profile image, use it as preview
      if (user.profile_image) {
        setPreviewImage(user.profile_image);
      }
    }
  }, [user, setFormData]);

  const handleChange = (e) => {
    if (e instanceof Date) {
      setFormData((prev) => ({
        ...prev,
        birthday: e.toISOString().split("T")[0],
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Add the file to formData
      setFormData((prev) => ({
        ...prev,
        profile_image: file,
      }));

      // Create and set preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger the hidden file input
  const triggerFileInput = () => {
    document.getElementById("profile-image-input").click();
  };

  const handleConfirm = (e) => {
    e?.preventDefault?.();
    onConfirm(formData);
  };

  // Convert string date to Date object for DatePicker
  const getBirthdayDate = () => {
    if (!formData.birthday) return null;
    return new Date(formData.birthday);
  };

  return (
    <div className="space-y-6">
      {/* Profile Image Section at the top */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-md mb-4">
            <img
              src={previewImage || defaultAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={triggerFileInput}
            className="absolute bottom-2 right-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        <input
          id="profile-image-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <span className="text-sm text-gray-500">
          Click the camera icon to change profile picture
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label={"Username"}
            name={"name"}
            onChange={handleChange}
            type={"text"}
            value={formData.name || ""}
          />
        </div>
        <div>
          <Input
            label={"Birth Day"}
            name={"birthday"}
            onChange={handleChange}
            type={"date"}
            value={getBirthdayDate()}
          />
        </div>
        <div>
          <Input
            label={"Email"}
            name={"email"}
            onChange={handleChange}
            type={"email"}
            readOnly={true}
            value={formData.email || ""}
          />
        </div>
        <div>
          <Input
            label={"Phone Number"}
            name={"phone_number"}
            onChange={handleChange}
            type={"number"}
            value={formData.phone_number || ""}
          />
        </div>
        <div>
          <Select
            label={"Gender"}
            name={"gender"}
            value={formData.gender || ""}
            item={gender}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <button
          onClick={handleConfirm}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit Biodata
        </button>
      </div>
    </div>
  );
}
