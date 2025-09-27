"use client";


import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import RequireAuth from '../../common/RequireAuth';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
}

const MyPurchase: React.FC = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
  });
  const [profileImage, setProfileImage] = useState<string>('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
        });
        // Get profile image using user ID for proper isolation
        const storedProfileImage = localStorage.getItem(`profileImage_${user.id}`);
        if (storedProfileImage) {
          setProfileImage(storedProfileImage);
        }

        // Load addresses from user-specific localStorage key
        const userSpecificKey = `addresses_${user.id}`;
        let storedAddresses = localStorage.getItem(userSpecificKey);
        
        // Migration: Check for old global addresses and migrate them to user-specific storage
        if (!storedAddresses) {
          const oldGlobalAddresses = localStorage.getItem('addresses');
          if (oldGlobalAddresses) {
            try {
              const parsedAddresses = JSON.parse(oldGlobalAddresses);
              if (parsedAddresses.length > 0) {
                // Migrate old addresses to user-specific storage
                localStorage.setItem(userSpecificKey, oldGlobalAddresses);
                localStorage.removeItem('addresses'); // Remove old global storage
                storedAddresses = oldGlobalAddresses;
                console.log('Migrated addresses to user-specific storage');
              }
            } catch (error) {
              console.error('Error migrating addresses:', error);
            }
          }
        }
        
        if (storedAddresses) {
          try {
            setAddresses(JSON.parse(storedAddresses));
          } catch (error) {
            console.error('Error parsing stored addresses:', error);
          }
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setFormData({
      name: '',
      phone: '',
      address: ''
    });
    setIsAddingNew(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address
    });
    setIsAddingNew(true);
  };

  const handleDeleteAddress = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      // Get current user ID
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (!storedUser) {
        alert('User not found. Please login again.');
        return;
      }

      try {
        const user = JSON.parse(storedUser);
        const userSpecificKey = `addresses_${user.id}`;
        
        const updatedAddresses = addresses.filter(addr => addr.id !== id);
        setAddresses(updatedAddresses);
        localStorage.setItem(userSpecificKey, JSON.stringify(updatedAddresses));
      } catch (error) {
        console.error('Error deleting address:', error);
        alert('Error deleting address. Please try again.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Basic phone number validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      alert('Please enter a valid phone number');
      return;
    }

    // Get current user ID
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!storedUser) {
      alert('User not found. Please login again.');
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      const userSpecificKey = `addresses_${user.id}`;

      if (editingAddress) {
        // Update existing address
        const updatedAddresses = addresses.map(addr => 
          addr.id === editingAddress.id 
            ? { ...addr, ...formData }
            : addr
        );
        setAddresses(updatedAddresses);
        localStorage.setItem(userSpecificKey, JSON.stringify(updatedAddresses));
        setSuccessMessage('Address updated successfully!');
      } else {
        // Add new address
        const newAddress: Address = {
          id: Date.now().toString(),
          ...formData
        };
        const updatedAddresses = [...addresses, newAddress];
        setAddresses(updatedAddresses);
        localStorage.setItem(userSpecificKey, JSON.stringify(updatedAddresses));
        setSuccessMessage('Address added successfully!');
      }

      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessMessage('');
      }, 3000);

      setIsAddingNew(false);
      setFormData({
        name: '',
        phone: '',
        address: ''
      });
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Error saving address. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingAddress(null);
    setFormData({
      name: '',
      phone: '',
      address: ''
    });
  };

  return (
    <RequireAuth>
    <div className="flex flex-col min-h-screen bg-white text.white font-sans">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slideIn">
          <Icon icon="mdi:check-circle" className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}
      {/* Mobile: My Account Plain Text with Dropdown Icon as Modal Trigger */}
      <div className="lg:hidden bg-white px-4 pt-4">
        <div
          className="w-full flex items-center justify-between p-0 text-black font-semibold text-lg cursor-pointer mt-4 border-b border-gray-200 pb-3"
          onClick={() => setIsAccountModalOpen(true)}
        >
          <span>Addresses</span>
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
              <li className="pl-8 py-3 bg-gray-100 rounded-lg transition-colors duration-300">
                <Link href="/addresses" className="text-black font-semibold text-base block transition-colors">Addresses</Link>
              </li>
              <li className="pl-8 py-3 hover:bg-gray-50 rounded-lg mb-2 transition-colors duration-300">
                <Link href="/changepassword" className="text-black hover:text-gray-900 text-base block transition-colors">Change Password</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="flex-grow bg-white py-6 md:py-12">
        <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Left Column - User Profile */}
            <div className="w-full lg:w-72 bg-white rounded-xl shadow-sm p-6 hidden lg:block">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gray-100 shadow-sm bg-gray-200 flex items-center justify-center">
                  {profileImage ? (
                    <img src={profileImage} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <Icon icon="lucide:user" className="w-8 h-8 text-gray-400" />
                  )}
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
                  <li className="pl-10 py-2 bg-gray-100 rounded-lg">
                    <Link href="/addresses" className="text-black font-semibold text-sm block">Addresses</Link>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg mb-2">
                    <Link href="/changepassword" className="text-black hover:text-gray-900 text-sm block transition-colors">Change Password</Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column - Addresses */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Header with Add New Address Button */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-black">Addresses</h3>
                  {!isAddingNew && (
                    <button 
                      onClick={handleAddNewAddress}
                      className="px-5 py-2 bg-black hover:bg-gray-800 text-white text-sm font-medium transition-colors rounded-none"
                    >
                      Add New Address
                    </button>
                  )}
                </div>

                {/* Address Content */}
                <div className="p-6">
                  {isAddingNew ? (
                    <div className="bg-white p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-black">
                          {editingAddress ? 'Edit Address' : 'Add New Address'}
                        </h3>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                          {/* Full Name */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-black">Full Name</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 text-base border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                          
                          {/* Phone Number */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-black">Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 text-base border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none"
                              placeholder="Enter your phone number"
                              required
                            />
                          </div>
                          
                          {/* Address */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-black">Address</label>
                            <textarea
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 text-base border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 resize-none rounded-none"
                              rows={3}
                              placeholder="Enter your complete address"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-3 text-black hover:text-gray-800 font-medium transition-colors duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium transition-all duration-200 rounded-none"
                          >
                            {editingAddress ? 'Save Changes' : 'Add Address'}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
                      <Icon icon="mdi:map-marker-off-outline" className="mx-auto mb-4 text-gray-400" width="48" height="48" />
                      <p className="text-gray-500">You don't have any addresses yet.</p>
                      <p className="text-gray-400 text-sm mt-2">Add an address for convenient delivery</p>
                    </div>
                  ) : (
                    addresses.map((address) => (
                      <div key={address.id} className="mb-4 p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
                        <h3 className="font-bold mb-2 text-black">Address</h3>
                        <p className="text-black">{address.name} | {address.phone}</p>
                        <p className="text-black">{address.address}</p>
                        <div className="flex space-x-3 mt-3">
                          <button 
                            onClick={() => handleEditAddress(address)}
                            className="text-indigo-700 hover:text-gray-900 text-sm font-medium px-2 py-1 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
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

export default MyPurchase;