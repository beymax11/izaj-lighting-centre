"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import RequireAuth from '../../common/RequireAuth';

const MyProfile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('profile.webp');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Load user data on component mount and hydrate from server
  useEffect(() => {
    const hydrate = async () => {
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      const storedProfileImage = localStorage.getItem('profileImage');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setFormData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || ''
          });
          if (storedProfileImage) setProfileImage(storedProfileImage);
        } catch {}
      } else {
        window.location.href = '/';
        return;
      }
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        const data = await res.json();
        const name = (data?.user?.user_metadata?.name || '').toString();
        const [firstName, ...rest] = name.trim().split(' ');
        const lastName = rest.join(' ');
        const phone = (data?.user?.user_metadata?.phone || '').toString();
        setFormData(prev => ({
          ...prev,
          firstName: firstName || prev.firstName,
          lastName: lastName || prev.lastName,
          phone: phone || prev.phone,
        }));
        const merged = {
          ...(storedUser ? JSON.parse(storedUser) : {}),
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          phone: phone || undefined,
        };
        localStorage.setItem('user', JSON.stringify(merged));
        sessionStorage.setItem('user', JSON.stringify(merged));
      } catch {}
    };
    hydrate();
  }, []);

  const validatePhone = (phone: string) => {
    const digits = (phone || '').replace(/\D/g, '');
    return /^(\d{11}|63\d{10})$/.test(digits);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    const newErrors = {
      firstName: formData.firstName.trim() === '' ? 'First name is required' : '',
      lastName: formData.lastName.trim() === '' ? 'Last name is required' : '',
      phone: !validatePhone(formData.phone) ? 'Please enter a valid 11-digit phone number' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        const msg = result?.error || 'Failed to update profile';
        setErrors(prev => ({ ...prev, phone: msg.includes('Phone') ? msg : prev.phone }));
        throw new Error(msg);
      }

      // Persist updated data locally for immediate UI reflect
      const updatedUserLocal = {
        id: result.user?.id || '',
        email: result.user?.email || formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      } as any;
      const existing = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (existing) {
        const prev = JSON.parse(existing);
        const merged = { ...prev, ...updatedUserLocal };
        localStorage.setItem('user', JSON.stringify(merged));
        sessionStorage.setItem('user', JSON.stringify(merged));
      }

      setIsLoading(false);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        alert('File size should be less than 1MB');
        return;
      }

      // Check file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPEG and PNG files are allowed');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setProfileImage(result);
          // Save the profile image to localStorage
          localStorage.setItem('profileImage', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    // Reset form data to original values
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || ''
      });
    }
    setIsEditMode(false);
    setErrors({
      firstName: '',
      lastName: '',
      phone: '',
    });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <RequireAuth>
    <div className="flex flex-col min-h-screen bg-white text-white font-sans">
      {/* Mobile: My Account Plain Text with Dropdown Icon as Modal Trigger */}
      <div className="lg:hidden bg-white px-4 pt-4">
        <div
          className="w-full flex items-center justify-between p-0 text-black font-semibold text-lg cursor-pointer mt-4 border-b border-gray-200 pb-3"
          onClick={() => setIsAccountModalOpen(true)}
        >
          <span>My Profile</span>
          <Icon icon="mdi:chevron-down" className="text-black w-6 h-6 ml-1" />
        </div>
      </div>
      {/* My Account Modal for Mobile */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden bg-black bg-opacity-40 overflow-y-auto" onClick={() => setIsAccountModalOpen(false)}>
          <div
            className="w-full bg-white animate-slideUp relative shadow-lg max-h-screen overflow-y-auto"
            style={{ minHeight: '240px' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setIsAccountModalOpen(false)}
              aria-label="Close"
            >
              <Icon icon="mdi:close" />
            </button>
            <div className="font-bold text-xl mb-4 text-black text-center mt-4">My Account</div>
            <ul className="space-y-1 px-4 pb-6">
              <li>
                <span className="inline-flex items-center text-black font-semibold text-base">
                  My Account
                </span>
              </li>
              <li className="pl-8 py-3 bg-gray-100 rounded-lg transition-colors duration-300">
                <a href="#profile" className="text-black font-semibold text-base block">Profile</a>
              </li>
              <li className="pl-8 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                <Link href="/payments" className="text-black hover:text-gray-900 text-base block transition-colors">Payment Methods</Link>
              </li>
              <li className="pl-8 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                <Link href="/addresses" className="text-black  hover:text-gray-900 text-base block transition-colors">Addresses</Link>
              </li>
              <li className="pl-8 py-3 hover:bg-gray-50 rounded-lg mb-2 transition-colors duration-300">
                <Link href="/change-password" className="text-black hover:text-gray-900 text-base block transition-colors">Change Password</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* Main Content - My Profile Section */}
      <main className="flex-grow bg-white py-6 md:py-8 lg:py-12">
        <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Left Column - User Profile (Sidebar) - Only on large screens */}
            <div className="w-full lg:w-72 p-6 transition-all duration-300 hover:shadow-md hidden lg:block">
              <div className="flex flex-col items-center">
                {/* Profile image and name only on desktop */}
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gray-100 shadow-sm transition-transform duration-300 hover:scale-105">
                  <img src={profileImage} alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="font-medium text-lg mb-6 text-center text-gray-800">
                  {`${formData.firstName} ${formData.lastName}`.trim() || 'User'}
                </div>
                <ul className="w-full space-y-1">
                  {/* My Account - Not highlighted */}
                  <li className="flex items-center p-3 rounded-lg mb-1 transition-colors duration-300">
                    <Icon icon="lucide:user" className="text-black mr-2 w-5 h-5" />
                    <span className="text-black font-medium text-sm">My Account</span>
                  </li>
                  {/* Submenu Items */}
                  <li className="pl-10 py-2 bg-gray-100 rounded-lg transition-colors duration-300">
                    <a href="#profile" className="text-black font-semibold text-sm block">Profile</a>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                    <Link href="/payments" className="text-black hover:text-gray-900 text-sm block transition-colors">Payment Methods</Link>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                    <Link href="/addresses" className="text-black hover:text-gray-900 text-sm block transition-colors">Addresses</Link>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg mb-2 transition-colors duration-300">
                    <Link href="/change-password" className="text-black hover:text-gray-900 text-sm block transition-colors">Change Password</Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Profile Content */}
            <div className="flex-1">
                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="p-2 sm:p-4 md:p-6 lg:p-8">
                  <div className="flex flex-col gap-4">
                    {/* Image Upload Section - Always on top for mobile and md */}
                    <div className="flex flex-col items-center mb-2">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-gray-200 mb-3 sm:mb-4 shadow-sm transition-transform duration-300 hover:scale-105">
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover"/>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/jpeg,image/png"
                        className="hidden"
                      />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-indigo-600 text-xs sm:text-sm font-medium hover:text-gray-700 mb-2 transition-colors"
                      >
                        Change Photo
                      </button>
                      <p className="text-gray-500 text-[10px] sm:text-xs text-center">
                        File size: maximum 1 MB<br/>
                        File extension: JPEG, PNG
                      </p>
                    </div>
                    {/* Form Fields */}
                    <div className="flex-1">
                      {/* First Name Field */}
                      <div className="mb-4 sm:mb-5">
                        <label className="block text-xs sm:text-sm font-medium text-black mb-2">First Name:</label>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                          className={`w-full p-2 sm:p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors text-gray-900 ${!isEditMode ? 'bg-gray-50' : ''}`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>}
                      </div>

                      {/* Last Name Field */}
                      <div className="mb-4 sm:mb-5">
                        <label className="block text-xs sm:text-sm font-medium text-black mb-2">Last Name:</label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                          className={`w-full p-2 sm:p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors text-gray-900 ${!isEditMode ? 'bg-gray-50' : ''}`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastName}</p>}
                      </div>

                      {/* Email Field (always disabled) */}
                      <div className="mb-4 sm:mb-5">
                        <label className="block text-xs sm:text-sm font-medium text-black mb-2">Email:</label>
                        <input 
                          type="email" 
                          value={formData.email} 
                          disabled
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        />
                      </div>

                      {/* Phone Number Field */}
                      <div className="mb-4 sm:mb-5">
                        <label className="block text-xs sm:text-sm font-medium text-black mb-2">Phone Number:</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                          className={`w-full p-2 sm:p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors text-gray-900 ${!isEditMode ? 'bg-gray-50' : ''}`}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                      </div>

                      {/* Save and Edit Buttons - moved here */}
                      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-2 sm:mt-4 mb-2">
                        {isEditMode ? (
                          <>
                            <button 
                              type="button"
                              onClick={handleCancelEdit}
                              className="px-6 sm:px-8 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors shadow-sm text-xs sm:text-base"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit"
                              disabled={isLoading}
                              className={`px-6 sm:px-8 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center text-xs sm:text-base ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                              {isLoading ? (
                                <>
                                  <Icon icon="mdi:loading" className="animate-spin mr-2" />
                                  Saving...
                                </>
                              ) : (
                                'Save'
                              )}
                            </button>
                          </>
                        ) : (
                          <button 
                            type="button"
                            onClick={handleEditClick}
                            className="px-6 sm:px-8 py-2 sm:py-3 bg-indigo-700 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors shadow-sm text-xs sm:text-base"
                          >
                            Edit
                          </button>
                        )}
                      </div>

                      {/* Request Account Deletion and Delete Buttons */}
                      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-6 sm:mt-8 pt-4 border-t border-gray-200 gap-2 sm:gap-0">
                        <button 
                          type="button"
                          className="text-red-500 text-xs sm:text-sm font-medium hover:text-red-600 transition-colors text-left"
                          onClick={() => setShowDeleteModal(true)}
                        >
                          Account Deletion
                        </button>
                        <button 
                          type="button"
                          className="px-4 sm:px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-sm"
                          onClick={() => setShowDeleteModal(true)}
                        >
                          Delete
                        </button>
                      </div>

                      {/* Delete Confirmation Modal */}
                      {showDeleteModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
                          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative max-h-screen overflow-y-auto">
                            <button
                              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                              onClick={() => setShowDeleteModal(false)}
                              aria-label="Close"
                            >
                              <Icon icon="mdi:close" />
                            </button>
                            <div className="text-lg font-semibold text-gray-900 mb-2">Confirm Account Deletion</div>
                            <div className="text-gray-700 text-sm mb-6">
                              Are you sure you want to delete your account? A confirmation link will be sent to your email <span className="font-semibold">{formData.email}</span>. Please check your inbox to proceed.
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-sm"
                                onClick={() => setShowDeleteModal(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors text-sm"
                                onClick={() => {
                                  setShowDeleteModal(false);
                                  // Simulate sending confirmation email here
                                  alert(`A confirmation link has been sent to ${formData.email}`);
                                }}
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </main>
    </div>
    </RequireAuth>
  );
};

export default MyProfile;