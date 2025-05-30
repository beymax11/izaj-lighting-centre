import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';


const ChangePass: React.FC = () => {




 

  return (
    <div className="flex flex-col min-h-screen bg-white text-white font-sans">
    
      {/* Main Content */}
<main className="flex-grow bg-gray-50 py-12">
  <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Column - User Profile */}
      <div className="w-full md:w-72 bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-indigo-100 shadow-sm">
            <img src="profile.webp" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="font-medium text-lg mb-6 text-center">Daniela Padilla</div>
        
            <ul className="w-full space-y-1">
            <li className="flex items-center p-3 bg-indigo-50 rounded-lg mb-1">
              <Icon icon="mdi:account" className="text-indigo-600 mr-2 w-5 h-5" />
              <span className="text-indigo-700 font-medium text-sm">My Account</span>
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <Link to="/my-profile" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Profile</Link>
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <Link to="/banks-cards" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Payment Methods</Link>
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <Link to="/addresses" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Addresses</Link>
            </li>
            <li className="pl-10 py-2 bg-indigo-50 rounded-lg mb-2">
              <a href="#change-password" className="text-indigo-600 font-medium text-sm block">Change Password</a>
            </li>
            <li className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Icon icon="mdi:clipboard-list-outline" className="text-gray-500 mr-2 w-5 h-5" />
              <Link to="/my-purchase" className="text-gray-700 hover:text-gray-900 text-sm font-medium">My Purchase</Link>
            </li>
            </ul>
          
        </div>
      </div>
      
      {/* Right Column - Change Password Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">CHANGE PASSWORD</h2>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Update Your Password</h3>
          </div>

          {/* Password Form */}
          <div className="p-6">
            <div className="max-w-md space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Current Password</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">New Password</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
                  placeholder="Enter new password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-colors"
                  placeholder="Confirm new password"
                />
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
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
  );
};

export default ChangePass;