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
    avatar: "/profile.webp",
  });

  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

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
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Icon icon="mdi:account-circle" className="w-12 h-12 text-yellow-400" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Profile Settings</h2>
            <p className="text-lg text-gray-600">Manage your account information</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border-l-4 border-yellow-300 p-8">
          {/* Profile image and basic info */}
          <div className="flex flex-col items-center mb-10">
            <button
              type="button"
              className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
              onClick={() => fileInputRef.current?.click()}
              title="Change profile picture"
            >
              <div className="w-40 h-40 rounded-full bg-gray-100 border-4 border-yellow-200 shadow-lg flex items-center justify-center overflow-hidden mb-4 relative group">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                  <Icon icon="mdi:camera" className="text-white w-10 h-10" />
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
            <h3 className="text-2xl font-bold text-gray-800 mt-4">Daniel Padilla</h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-4 py-1 rounded-full mt-2">Administrator</span>
          </div>

          {/* Profile form */}
          <form onSubmit={handleSave} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  disabled={!editMode}
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-50 text-gray-700"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  disabled={!editMode}
                  value={profile.address || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-50 text-gray-700"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Role</label>
              <input
                type="text"
                name="role"
                disabled
                value={profile.role}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {!editMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="px-8 py-3 rounded-xl bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition shadow-md hover:shadow-lg"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition shadow-md hover:shadow-lg"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition shadow-md hover:shadow-lg"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition shadow-md hover:shadow-lg"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileSettings;
