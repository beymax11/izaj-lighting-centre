import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

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

  // Load user data on component mount
  useEffect(() => {
    console.log('Loading user data from storage...');
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    const storedProfileImage = localStorage.getItem('profileImage');
    
    console.log('Stored user data:', storedUser);
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('Parsed user data:', userData);
        
        // Set the form data with the stored values
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || ''
        });

        // Set profile image if exists
        if (storedProfileImage) {
          setProfileImage(storedProfileImage);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    } else {
      console.log('No user data found in storage');
      // Redirect to login if no user data found
      window.location.href = '/';
    }
  }, []);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone);
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
      // Update user data in storage
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const updatedUser = {
          ...userData,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        };

        // Update in both storages to ensure data persistence
        localStorage.setItem('user', JSON.stringify(updatedUser));
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setIsEditMode(false);
      // Show success message here
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

  return (
    <div className="flex flex-col min-h-screen bg-white text-white font-sans">
      {/* Mobile: My Account Plain Text with Dropdown Icon as Modal Trigger */}
      <div className="md:hidden bg-white px-4 pt-4">
        <div
          className="w-full flex items-center gap-2 p-0 text-gray-700 font-medium text-base cursor-pointer"
          onClick={() => setIsAccountModalOpen(true)}
        >
          <Icon icon="mdi:account" className="text-gray-600 w-5 h-5" />
          <span>My Account</span>
          <Icon icon="mdi:chevron-down" className="text-gray-600 w-5 h-5 ml-1" />
        </div>
      </div>
      {/* My Account Modal for Mobile */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden bg-black bg-opacity-40" onClick={() => setIsAccountModalOpen(false)}>
          <div
            className="w-full bg-white animate-slideUp relative"
            style={{ minHeight: '220px' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setIsAccountModalOpen(false)}
              aria-label="Close"
            >
              <Icon icon="mdi:close" />
            </button>
            <div className="font-semibold text-lg mb-4 text-black text-center mt-2">My Account</div>
            <ul className="space-y-1 px-4 pb-6">
              <li>
                <span className="inline-flex items-center text-gray-700 font-medium text-sm">
                  <Icon icon="mdi:account" className="text-gray-600 mr-2 w-5 h-5" />
                  My Account
                </span>
              </li>
              <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                <a href="#profile" className="text-black font-medium text-sm block">Profile</a>
              </li>
              <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                <Link to="/banks-cards" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Payment Methods</Link>
              </li>
              <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                <Link to="/addresses" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Addresses</Link>
              </li>
              <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg mb-2 transition-colors duration-300">
                <Link to="/change-password" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Change Password</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* Main Content - My Profile Section */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - User Profile (Narrower) - Hidden on mobile */}
            <div className="w-full md:w-72 bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hidden md:block">
              <div className="flex flex-col items-center">
                {/* Profile image and name only on desktop */}
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gray-100 shadow-sm transition-transform duration-300 hover:scale-105">
                  <img src={profileImage} alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="font-medium text-lg mb-6 text-center text-gray-800">
                  {`${formData.firstName} ${formData.lastName}`.trim() || 'User'}
                </div>
                <ul className="w-full space-y-1">
                  {/* My Account - Active Item */}
                  <li className="flex items-center p-3 bg-gray-50 rounded-lg mb-1 transition-colors duration-300">
                    <Icon icon="mdi:account" className="text-gray-600 mr-2 w-5 h-5" />
                    <span className="text-gray-700 font-medium text-sm">My Account</span>
                  </li>
                  {/* Submenu Items */}
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                    <a href="#profile" className="text-gray-600 font-medium text-sm block">Profile</a>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                    <Link to="/banks-cards" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Payment Methods</Link>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                    <Link to="/addresses" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Addresses</Link>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg mb-2 transition-colors duration-300">
                    <Link to="/change-password" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Change Password</Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Profile Content */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
               

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Column - Form Fields */}
                    <div className="flex-1">
                      {/* First Name Field */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name:</label>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                          className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors text-gray-900 ${!isEditMode ? 'bg-gray-50' : ''}`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>

                      {/* Last Name Field */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name:</label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                          className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors text-gray-900 ${!isEditMode ? 'bg-gray-50' : ''}`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>

                      {/* Email Field (always disabled) */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                        <input 
                          type="email" 
                          value={formData.email} 
                          disabled
                          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        />
                      </div>

                      {/* Phone Number Field */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number:</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditMode}
                          className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors text-gray-900 ${!isEditMode ? 'bg-gray-50' : ''}`}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>

                      {/* Request Account Deletion and Delete Buttons */}
                      <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
                        <button 
                          type="button"
                          className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors"
                        >
                          Request Account Deletion
                        </button>
                        <button 
                          type="button"
                          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div className="flex flex-col items-center md:items-start">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 mb-4 shadow-sm transition-transform duration-300 hover:scale-105">
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
                        className="text-gray-600 text-sm font-medium hover:text-gray-700 mb-2 transition-colors"
                      >
                        Change Photo
                      </button>
                      <p className="text-gray-500 text-xs">
                        File size: maximum 1 MB<br/>
                        File extension: JPEG, PNG
                      </p>
                    </div>
                  </div>

                  {/* Save and Edit Buttons */}
                  <div className="flex justify-end gap-4 mt-8">
                    {isEditMode ? (
                      <>
                        <button 
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors shadow-sm"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          disabled={isLoading}
                          className={`px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
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
                        className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors shadow-sm"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;