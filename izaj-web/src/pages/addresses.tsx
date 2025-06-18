import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

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
  const [profileImage, setProfileImage] = useState<string>('profile.webp');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

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

    // Load addresses from localStorage
    const storedAddresses = localStorage.getItem('addresses');
    if (storedAddresses) {
      try {
        setAddresses(JSON.parse(storedAddresses));
      } catch (error) {
        console.error('Error parsing stored addresses:', error);
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
      const updatedAddresses = addresses.filter(addr => addr.id !== id);
      setAddresses(updatedAddresses);
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      const updatedAddresses = addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addr, ...formData }
          : addr
      );
      setAddresses(updatedAddresses);
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData
      };
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    }

    setIsAddingNew(false);
    setFormData({
      name: '',
      phone: '',
      address: ''
    });
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
    <div className="flex flex-col min-h-screen bg-white text-white font-sans">
      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - User Profile */}
            <div className="w-full md:w-72 bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gray-100 shadow-sm">
                  <img src={profileImage} alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="font-medium text-lg mb-6 text-center text-black">
                  {`${userData.firstName} ${userData.lastName}`.trim() || 'User'}
                </div>
            
                <ul className="w-full space-y-1">
                  <li className="flex items-center p-3 bg-gray-100 rounded-lg mb-1">
                    <Icon icon="lucide:user" className="text-gray-600 mr-2 w-5 h-5" />
                    <span className="text-gray-700 font-medium text-sm">My Account</span>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
                    <Link to="/my-profile" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Profile</Link>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
                    <Link to="/banks-cards" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Payment Methods</Link>
                  </li>
                  <li className="pl-10 py-2 bg-gray-100 rounded-lg">
                    <Link to="/addresses" className="text-gray-700 font-medium text-sm block">Addresses</Link>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg mb-2">
                    <Link to="/change-password" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Change Password</Link>
                  </li>
                 
                </ul>
              </div>
            </div>
            
            {/* Right Column - Addresses */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Header with Add New Address Button */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800">Addresses</h3>
                  {!isAddingNew && (
                    <button 
                      onClick={handleAddNewAddress}
                      className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                    >
                      Add New Address
                    </button>
                  )}
                </div>

                {/* Address Content */}
                <div className="p-6">
                  {isAddingNew ? (
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">
                          {editingAddress ? 'Edit Address' : 'Add New Address'}
                        </h3>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                              <Icon icon="mdi:account" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 bg-white text-gray-900"
                                placeholder="Enter your full name"
                                required
                              />
                            </div>
                          </div>
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <div className="relative">
                              <Icon icon="mdi:phone" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 bg-white text-gray-900"
                                placeholder="Enter your phone number"
                                required
                              />
                            </div>
                          </div>
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <div className="relative">
                              <Icon icon="mdi:map-marker" className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                              <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-200 resize-none bg-white text-gray-900"
                                rows={3}
                                placeholder="Enter your complete address"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
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
                      <div key={address.id} className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                        <h3 className="font-bold mb-2 text-gray-800">Address</h3>
                        <p className="text-gray-800">{address.name} | {address.phone}</p>
                        <p className="text-gray-800">{address.address}</p>
                        <div className="flex space-x-3 mt-3">
                          <button 
                            onClick={() => handleEditAddress(address)}
                            className="text-gray-700 hover:text-gray-900 text-sm font-medium px-2 py-1 transition-colors"
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
  );
};

export default MyPurchase;