import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const MyProfile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  // Load user data on component mount
  useEffect(() => {
    console.log('Loading user data from storage...');
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    console.log('Stored user data:', storedUser);
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('Parsed user data:', userData);
        
        // Split the full name into first name and last name
        const nameParts = (userData.name || '').split(' ');
        console.log('Name parts:', nameParts);
        
        const newFormData = {
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: userData.email || '',
          phone: userData.phone || ''
        };
        console.log('Setting form data:', newFormData);
        
        setFormData(newFormData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    } else {
      console.log('No user data found in storage');
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
      const formattedUser = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone
      };

      // Update in the same storage where it was originally saved
      const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(formattedUser));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
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
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-white font-sans">
      {/* Main Content - My Profile Section */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - User Profile (Narrower) */}
            <div className="w-full md:w-72 bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-indigo-100 shadow-sm transition-transform duration-300 hover:scale-105">
                  <img src="profile.webp" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="font-medium text-lg mb-6 text-center text-gray-800">
                  {`${formData.firstName} ${formData.lastName}`.trim() || 'User'}
                </div>
            
                <ul className="w-full space-y-1">
                  {/* My Account - Active Item */}
                  <li className="flex items-center p-3 bg-indigo-50 rounded-lg mb-1 transition-colors duration-300">
                    <Icon icon="mdi:account" className="text-indigo-600 mr-2 w-5 h-5" />
                    <span className="text-indigo-700 font-medium text-sm">My Account</span>
                  </li>
                  
                  {/* Submenu Items */}
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                    <a href="#profile" className="text-indigo-600 font-medium text-sm block">Profile</a> 
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
                  
                  <li className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                    <Icon icon="mdi:clipboard-list-outline" className="text-gray-500 mr-2 w-5 h-5" />
                    <Link to="/my-purchase" className="text-gray-700 hover:text-gray-900 text-sm font-medium">My Purchase</Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Profile Content */}
            <div className="flex-1">
            

              <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                {/* Profile Header */}
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
                  <p className="text-gray-600 text-sm mt-1">Manage and protect your account</p>
                </div>

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
                          className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors text-gray-900`}
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
                          className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors text-gray-900`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>

                      {/* Email Field (disabled) */}
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
                          className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors text-gray-900`}
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
                        className="text-indigo-600 text-sm font-medium hover:text-indigo-700 mb-2 transition-colors"
                      >
                        Change Photo
                      </button>
                      <p className="text-gray-500 text-xs">
                        File size: maximum 1 MB<br/>
                        File extension: JPEG, PNG
                      </p>
                    </div>
                  </div>

                  {/* Save Button (Separate at bottom) */}
                  <div className="flex justify-end gap-4 mt-8">
                    <button 
                      type="button"
                      className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors shadow-sm"
                    >
                      Edit
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