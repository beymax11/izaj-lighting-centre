import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: "Daniel Padilla",
    email: "danielpadilla@izaj.com",
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
    alert("Profile updated!");
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f7f8fa]">
      {/* Section Header - flush to the top, just like Messages */}
      <header className="px-8 py-6 bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
            <Icon icon="mdi:account-circle" className="text-yellow-400 w-8 h-8" />
            Profile Settings
          </h2>
          <p className="text-base text-gray-600 pl-11">
            Manage your account information
          </p>
        </div>
      </header>

      {/* Main Content - removed pt-8, mt-xx, and all overflow/scrolling. Added extra margin-bottom for space from header. */}
      <main className="flex-1 px-8 pb-10 bg-[#f7f8fa] w-full">
        <div className="max-w-7xl mx-auto flex flex-row gap-8" style={{marginTop: "36px"}}>
          {/* Profile Card */}
          <div className="w-[375px] min-w-[320px] max-w-[430px] bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center p-8">
            <button
              type="button"
              className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
              onClick={() => fileInputRef.current?.click()}
              title="Change profile picture"
            >
              <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-yellow-200 shadow-lg flex items-center justify-center overflow-hidden mb-4 relative group">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
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
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mt-2">{profile.name}</h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full mt-1 inline-block">
                {profile.role}
              </span>
              <div className="mt-3">
                <p className="text-gray-400 text-sm">{profile.email}</p>
                <p className="text-gray-400 text-sm">{profile.phone}</p>
              </div>
            </div>
          </div>
          {/* Profile Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-12 flex flex-col justify-center">
            <form onSubmit={handleSave} className="space-y-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="block text-gray-700 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    disabled={!editMode}
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-50 text-gray-700 text-lg"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-700 font-medium">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    disabled={!editMode}
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-50 text-gray-700 text-lg"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-700 font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    disabled={!editMode}
                    value={profile.address || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-50 text-gray-700 text-lg"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-700 font-medium">Role</label>
                  <input
                    type="text"
                    name="role"
                    disabled
                    value={profile.role}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    disabled
                    value={profile.email}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-700 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    disabled={!editMode}
                    value={profile.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-50 text-gray-700 text-lg"
                    placeholder={editMode ? "Enter new password" : "********"}
                  />
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 justify-end">
                {!editMode ? (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="px-8 py-3 rounded-xl bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition shadow-md hover:shadow-lg text-lg"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition shadow-md hover:shadow-lg text-lg"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition shadow-md hover:shadow-lg text-lg"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;