import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";

// Sample admin profile settings component
const AdminProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@izaj.com",
    password: "",
    phone: "0917-123-4567",
    role: "Administrator",
    address: "San Pablo",
    avatar: "/profile.webp", // Add avatar property
  });

  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile((prev) => ({
          ...prev,
          avatar: ev.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    // Save logic here
    alert("Profile updated!");
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-0">
      <div className="w-full max-w-6xl mx-auto mb-2 mt-[40px] px-8">
        <div className="flex items-center gap-3">
          <Icon icon="mdi:account-circle" className="w-10 h-10 text-yellow-400" />
          <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
        </div>
        <p className="text-lg text-gray-600 mt-2">Welcome to your profile settings!</p>
      </div>
      <div
        className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border-l-4 border-yellow-300 p-8 flex flex-col items-center justify-center"
        style={{ height: "600px", overflowY: "hidden" }} // Prevent scroll
      >
        {/* Profile image and basic info */}
        <div className="flex flex-col items-center mb-8 mt-0">
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => fileInputRef.current?.click()}
            title="Change profile picture"
          >
            <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-yellow-200 shadow-lg flex items-center justify-center overflow-hidden mb-4 relative group">
              <img
                src={profile.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Icon icon="mdi:camera" className="text-white w-8 h-8" />
              </div>
            </div>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleAvatarChange}
          />
          <span className="text-xl font-semibold text-gray-800">Daniel Padilla</span>
          <span className="text-sm text-gray-500">Administrator</span>
        </div>

        {/* Profile form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                disabled={!editMode}
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-100"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                disabled={!editMode}
                value={profile.address || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              disabled
              value={profile.role}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-black"
            />
          </div>

          {/* Save or Cancel Buttons */}
          <div className="flex gap-4 mt-4">
            {!editMode ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileSettings;
