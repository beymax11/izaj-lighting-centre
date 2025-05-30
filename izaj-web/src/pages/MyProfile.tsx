import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const MyProfile: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-white font-sans">
      {/* Main Content - My Profile Section */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - User Profile (Narrower) */}
            <div className="w-full md:w-72 bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-indigo-100 shadow-sm">
                  <img src="profile.webp" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="font-medium text-lg mb-6 text-center">Daniela Padilla</div>
            
                <ul className="w-full space-y-1">
                  {/* My Account - Active Item */}
                  <li className="flex items-center p-3 bg-indigo-50 rounded-lg mb-1">
                    <Icon icon="mdi:account" className="text-indigo-600 mr-2 w-5 h-5" />
                    <span className="text-indigo-700 font-medium text-sm">My Account</span>
                  </li>
                  
                  {/* Submenu Items */}
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
                    <a href="#profile" className="text-indigo-600 font-medium text-sm block">Profile</a> 
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
                    <Link to="/banks-cards" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Payment Methods</Link>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
                    <Link to="/addresses" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Addresses</Link>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg mb-2">
                    <Link to="/change-password" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Change Password</Link>
                  </li>
                  
                  <li className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Icon icon="mdi:clipboard-list-outline" className="text-gray-500 mr-2 w-5 h-5" />
                    <Link to="/my-purchase" className="text-gray-700 hover:text-gray-900 text-sm font-medium">My Purchase</Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Profile Content */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">MY ACCOUNT</h2>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Profile Header */}
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
                  <p className="text-gray-600 text-sm mt-1">Manage and protect your account</p>
                </div>

                {/* Profile Form */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Column - Form Fields */}
                    <div className="flex-1">
                      {/* Name Field */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
                        <input 
                          type="text" 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>

                      {/* Email Field (disabled) */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                        <input 
                          type="email" 
                          value="danielpadilla@gmail.com" 
                          disabled
                          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>

                      {/* Phone Number Field */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number:</label>
                        <input 
                          type="tel" 
                          value="091234567890" 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
                        />
                      </div>

                      {/* Request Account Deletion and Delete Buttons */}
                      <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
                        <button className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors">
                          Request Account Deletion
                        </button>
                        <button className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div className="flex flex-col items-center md:items-start">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 mb-4 shadow-sm">
                        <img src="profile.webp" alt="Profile" className="w-full h-full object-cover"/>
                      </div>
                      <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 mb-2 transition-colors">
                        Change Photo
                      </button>
                      <p className="text-gray-500 text-xs">
                        File size: maximum 1 MB<br/>
                        File extension: JPEG, PNG
                      </p>
                    </div>
                  </div>

                  {/* Save Button (Separate at bottom) */}
                  <div className="flex justify-end mt-8">
                    <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;