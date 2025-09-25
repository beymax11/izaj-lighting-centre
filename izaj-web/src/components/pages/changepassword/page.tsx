"use client";

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import RequireAuth from '../../common/RequireAuth';

const ChangePass: React.FC = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
  });
  const [profileImage, setProfileImage] = useState<string>('profile.webp');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    const storedProfileImage = localStorage.getItem('profileImage');
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
        });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }

    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  return (
    <RequireAuth>
    <div className="flex flex-col min-h-screen bg-white text-white font-sans">
      {/* Mobile: My Account Plain Text with Dropdown Icon as Modal Trigger */}
      <div className="lg:hidden bg-white px-4 pt-4">
        <div
          className="w-full flex items-center justify-between p-0 text-black font-semibold text-lg cursor-pointer mt-4 border-b border-gray-200 pb-3"
          onClick={() => setIsAccountModalOpen(true)}
        >
          <span>Change Password</span>
          <Icon icon="mdi:chevron-down" className="text-black w-6 h-6 ml-1" />
        </div>
      </div>
      {/* My Account Modal for Mobile */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden bg-black bg-opacity-40 overflow-y-auto" onClick={() => setIsAccountModalOpen(false)}>
          <div
            className="w-full bg-white animate-slideUp  relative shadow-lg max-h-screen overflow-y-auto"
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
              <li className="pl-8 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                <Link href="/account#profile" className="text-black hover:text-gray-900 text-base block transition-colors">Profile</Link>
              </li>
              <li className="pl-8 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                <Link href="/payments" className="text-black hover:text-gray-900 text-base block transition-colors">Payment Methods</Link>
              </li>
              <li className="pl-8 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                <Link href="/addresses" className="text-black hover:text-gray-900 text-base block transition-colors">Addresses</Link>
              </li>
              <li className="pl-8 py-3 bg-gray-100 rounded-lg mb-2 transition-colors duration-300">
                <Link href="/changepassword" className="text-black font-semibold text-base block transition-colors">Change Password</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* Main Content */}
<main className="flex-grow white py-12">
  <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Left Column - User Profile */}
      <div className="hidden lg:block w-full lg:w-72 bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gray-100 shadow-sm">
            <img src={profileImage} alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="font-medium text-lg mb-6 text-center text-black">
            {`${userData.firstName} ${userData.lastName}`.trim() || 'User'}
          </div>
        
            <ul className="w-full space-y-1">
            <li className="flex items-center p-3 rounded-lg mb-1">
               <Icon icon="lucide:user" className="text-black mr-2 w-5 h-5" />
              <span className="text-black font-medium text-sm">My Account</span>
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <Link href="/account#profile" className="text-black hover:text-gray-900 text-sm block transition-colors">Profile</Link>
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <Link href="/payments" className="text-black hover:text-gray-900 text-sm block transition-colors">Payment Methods</Link>
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <Link href="/addresses" className="text-black hover:text-gray-900 text-sm block transition-colors">Addresses</Link>
            </li>
            <li className="pl-10 py-2 bg-gray-100 rounded-lg mb-2">
              <a href="/changepassword" className="text-black font-semibold text-sm block">Change Password</a>
            </li>
           
            </ul>
          
        </div>
      </div>
      {/* Right Column - Change Password Section */}
      <div className="w-full md:flex-1">
     
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-black">Update Your Password</h3>
          </div>

          {/* Password Form */}
          <div className="p-6">
            <div className="max-w-md space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Current Password</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-colors"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-black">New Password</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-colors"
                  placeholder="Enter new password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Confirm Password</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-colors"
                  placeholder="Confirm new password"
                />
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <button className="px-8 py-3 bg-black hover:bg-gray-900 text-white text-sm font-medium  transition-colors shadow-sm">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

    
    </div>
    </RequireAuth>
  );
};

export default ChangePass;