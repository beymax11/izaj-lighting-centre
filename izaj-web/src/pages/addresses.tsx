import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';


const MyPurchase: React.FC = () => {
 

 

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
          <div className="font-medium text-lg mb-6 text-center">Daniel Padilla</div>
        
          <ul className="w-full space-y-1">
            <li className="flex items-center p-3 bg-indigo-50 rounded-lg mb-1">
              <Icon icon="lucide:user" className="text-indigo-600 mr-2 w-5 h-5" />
              <span className="text-indigo-700 font-medium text-sm">My Account</span>
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <Link to="/my-profile" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Profile</Link>
            </li>
            <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
              <Link to="/banks-cards" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Payment Methods</Link>
            </li>
            <li className="pl-10 py-2 bg-indigo-50 rounded-lg">
              <Link to="/addresses" className="text-indigo-600 font-medium text-sm block">Addresses</Link>
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
      
      {/* Right Column - Addresses */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">MY ADDRESSES</h2>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header with Add New Address Button */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Addresses</h3>
            <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
              Add New Address
            </button>
          </div>

          {/* Address Content */}
          <div className="p-6">
            {/* Existing Address */}
            <div className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
              <h3 className="font-bold mb-2 text-gray-800">Address</h3>
              <p className="text-gray-800">Daniel Padilla | (+63) 912 345 6789</p>
              <p className="text-gray-800">123 J.P Rizal St, San Pablo City, Laguna, Philippines 1234</p>
              <div className="flex space-x-3 mt-3">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 transition-colors">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 transition-colors">
                  Delete
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

export default MyPurchase;