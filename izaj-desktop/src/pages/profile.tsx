import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Session } from "@supabase/supabase-js"
import { supabase } from "../../backend/supabase/supabaseClient";

interface ProfileProps {
  handleNavigation?: (page: string) => void;
  session: Session | null;
  setProfile: (profile: ProfileData) => void;
  profile: ProfileData | null;
}

export interface ProfileData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  address: string;
  avatar: string;
}

const Profile: React.FC<ProfileProps> = ({ handleNavigation, session }) => {

  console.log("Profile session:",  session?.user.id);

  const [isMobileView, setIsMobileView] = useState(false);

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    address: "",
    avatar: "/profile.jpg",
  });

  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [originalProfile, setOriginalProfile] = useState<ProfileData | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file || !session?.user?.id) {
    console.error("File is missing or session ID is missing");
    setError("Invalid file or session.");
    return;
  }

  console.log("Uploading file:", file.name, file.type, file.size);
  console.log("Session user ID:", session.user.id);

  try {
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    if (sessionError) {
      console.error("Session sync error:", sessionError);
      setError("Authentication error. Please try logging in again.");
      return;
    }

    // Verify the session is set correctly
    const { data: { user } } = await supabase.auth.getUser();
    console.log("Supabase user after session sync:", user?.id);
    
    if (!user || user.id !== session.user.id) {
      console.error("User ID mismatch or no user found");
      setError("Authentication mismatch. Please refresh and try again.");
      return;
    }

    const filePath = `${session.user.id}/profile.jpg`;
    console.log("Upload path:", filePath);

    // Now upload with properly synced session
    const { error: uploadError } = await supabase.storage
      .from('avatar')
      .upload(filePath, file, {
        upsert: true,
        cacheControl: '3600',
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      setError("Upload failed: " + uploadError.message);
      return;
    }

    // Get the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('avatar')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;
    console.log("Generated public URL:", publicUrl);

    // Update backend with the public URL
    const response = await fetch(`http://localhost:3001/api/profile/${session.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        ...profile,
        avatar: publicUrl,
        password: "",
      }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      console.error("Backend avatar update failed:", result);
      setError(result.error || 'Failed to update profile avatar.');
      return;
    }

    // Update local state with the public URL
    setProfile(prev => ({
      ...prev,
      avatar: publicUrl,
    }));
    
    setSuccess("Profile photo updated!");

    } catch (error) {
      console.error("Unexpected error during avatar upload:", error);
      setError("An unexpected error occurred during upload.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!editMode) return;

  if (!profile.name.trim()) {
    setError("Name is required.");
    return;
  }

  if (
    originalProfile &&
    profile.name === originalProfile.name &&
    profile.phone === originalProfile.phone &&
    profile.address === originalProfile.address &&
    profile.password.trim() === ""
  ) {
    setError("No changes made to save.");
    return;
  }

  await updateUserProfile(profile);
  };

  const handleCancel = () => {
    setEditMode(false);
    setError(null);
    setSuccess(null);
    setProfile(prev => ({ ...prev, password: "" }));

    if (session?.user?.id) {
      fetchUserProfile(session.user.id);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3001/api/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || ''}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch profile');
      }

      setProfile({
        name: data.profile.name || "",
        email: data.profile.email || "",
        password: "",
        phone: data.profile.phone || "",
        role: data.profile.role || "",
        address: data.profile.address || "",
        avatar: data.profile.avatar || "/profile.jpg",
      });

      setOriginalProfile({
        name: data.profile.name || "",
        email: data.profile.email || "",
        password: "",
        phone: data.profile.phone || "",
        role: data.profile.role || "",
        address: data.profile.address || "",
        avatar: data.profile.avatar || "/profile.jpg",
      });

    } catch (err: any) {
      console.error("Error fetching profile:", err);
      
      if (err.message.includes('not found') || err.message.includes('404')) {
        setError('Profile not found. Please contact support.');
      } else if (err.message.includes('401') || err.message.includes('Authorization')) {
        setError('Please log in again to view your profile.');
      } else if (err.message.includes('Network')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('Unable to load profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserProfile(session.user.id);
    } else {
      setLoading(false);
    }
  }, [session]);

  const updateUserProfile = async (profileData: ProfileData) => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(`http://localhost:3001/api/profile/${session?.user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || ''}`,
        },
        body: JSON.stringify({
          name: profileData.name,
          phone: profileData.phone,
          address: profileData.address,
          password: profileData.password || undefined,
        }),
      });
      

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to update profile');
      }

      setSuccess('Profile updated successfully!');
      setEditMode(false);
      
      setProfile(prev => ({ ...prev, password: "" }));
      
      setTimeout(() => setSuccess(null), 3000);

    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

    const getAvatarUrl = (avatarPath: string) => {
      if (!avatarPath || avatarPath === '' || avatarPath === '/profile.jpg') {
        return '/profile.jpg';
      }

      if (avatarPath.includes('https://') && avatarPath.indexOf('https://') !== avatarPath.lastIndexOf('https://')) {
        console.log("Detected malformed duplicate URL, extracting correct path");
        const match = avatarPath.match(/([0-9a-f-]{36}\/[^\/]+)$/);
        if (match) {
          const cleanPath = match[1];
          console.log("Extracted clean path:", cleanPath);
          try {
            const { data } = supabase.storage.from('avatar').getPublicUrl(cleanPath);
            return data.publicUrl;
          } catch (error) {
            console.error("Error generating clean URL:", error);
            return '/profile.jpg';
          }
        }
      }

      if (avatarPath.startsWith('https://') || avatarPath.startsWith('http://')) {
        return avatarPath;
      }

      try {
        const { data } = supabase.storage.from('avatar').getPublicUrl(avatarPath);
        return data.publicUrl;
      } catch (error) {
        console.error("Error generating avatar URL:", error);
        return '/profile.jpg';
      }
    };

    if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full bg-[#f7f8fa]">
        <div className="text-center">
          <Icon icon="mdi:loading" className="animate-spin text-yellow-400 w-8 h-8 mx-auto mb-2" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

    


  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f7f8fa]">
      <header className="px-4 sm:px-8 py-4 sm:py-6 bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            {isMobileView && (
              <button
                onClick={() => handleNavigation?.('DASHBOARD')}
                className="p-2 hover:bg-yellow-50 rounded-lg transition"
              >
                <Icon icon="mdi:arrow-left" className="w-6 h-6 text-gray-600" />
              </button>
            )}
            <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-gray-800">
              <Icon icon="mdi:account-circle" className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
              Profile Settings
            </h2>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-8 pb-6 sm:pb-10 bg-[#f7f8fa] w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8" style={{marginTop: "24px"}}>
          {/* Profile Card */}
          <div className="w-full lg:w-[375px] lg:min-w-[320px] lg:max-w-[430px] bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center p-6 sm:p-8">
            <button
              type="button"
              className="focus:outline-none transform hover:scale-105 transition-transform duration-200"
              onClick={() => fileInputRef.current?.click()}
              title="Change profile picture"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-100 border-4 border-yellow-200 shadow-lg flex items-center justify-center overflow-hidden mb-4 relative group">
                <img
                  src={getAvatarUrl(profile.avatar)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log("Image failed to load, using default");
                    (e.target as HTMLImageElement).src = "/profile.jpg";
                  }}
                  onLoad={() => {
                    console.log("Avatar image loaded successfully");
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                  <Icon icon="mdi:camera" className="text-white w-6 h-6 sm:w-8 sm:h-8" />
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
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-2">{profile.name}</h3>
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
          <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
            <form onSubmit={handleSave} className="space-y-6 sm:space-y-8 max-w-2xl mx-auto w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div className="space-y-1">
                  <label className="block text-gray-700 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    disabled={!editMode}
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-50 text-gray-700 text-base sm:text-lg"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-50 text-gray-700 text-base sm:text-lg"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-50 text-gray-700 text-base sm:text-lg"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-base sm:text-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    disabled
                    value={profile.email}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-base sm:text-lg"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition disabled:bg-gray-50 text-gray-700 text-base sm:text-lg"
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
                      disabled={saving}
                      className="px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition shadow-md hover:shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {saving && <Icon icon="mdi:loading" className="animate-spin w-4 h-4" />}
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="px-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition shadow-md hover:shadow-lg text-lg disabled:opacity-50"
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