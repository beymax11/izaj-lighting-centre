import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';


const BankandCard: React.FC = () => {
 
  const [activeTab, setActiveTab] = useState('Banks & Cards');

  const paymentTabs = ['Banks & Cards', 'E-Wallet'];
 
 
 

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
     

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
                <div className="font-medium text-lg mb-6 text-center text-black">Daniela Padilla</div>
            
                <ul className="w-full space-y-1">
                  <li className="flex items-center p-3 bg-indigo-50 rounded-lg mb-1">
                    <Icon icon="lucide:user" className="text-indigo-600 mr-2 w-5 h-5" />
                    <span className="text-indigo-700 font-medium text-sm">My Account</span>
                  </li>
                  <li className="pl-10 py-2 hover:bg-gray-50 rounded-lg">
                    <Link to="/my-profile" className="text-gray-600 hover:text-gray-900 text-sm block transition-colors">Profile</Link>
                  </li>
                  <li className="pl-10 py-2 bg-indigo-50 rounded-lg">
                    <Link to="/banks-cards" className="text-indigo-600 font-medium text-sm block">Payment Methods</Link>
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
            
            {/* Right Column - Payment Methods */}
            <div className="flex-1">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">PAYMENTS METHODS</h2>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Tabs Navigation */}
                <div className="flex border-b border-gray-200">
                  {paymentTabs.map((tab) => (
                    <button
                      key={tab}
                      className={`flex-1 py-4 px-2 text-sm font-medium transition-colors ${
                        activeTab === tab 
                          ? 'border-b-2 border-indigo-600 text-indigo-600' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'Banks & Cards' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold flex items-center text-gray-800">
                          <Icon icon="mdi:credit-card-outline" className="mr-2 text-indigo-600" width="24" height="24" />
                          Credit/Debit Cards
                        </h3>
                        <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                          Add New Card
                        </button>
                      </div>
                      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
                        <Icon icon="mdi:credit-card-off-outline" className="mx-auto mb-4 text-gray-400" width="48" height="48" />
                        <p className="text-gray-500">You don't have any cards yet.</p>
                        <p className="text-gray-400 text-sm mt-2">Add a card to make checkout faster</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'E-Wallet' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold flex items-center text-gray-800">
                          <Icon icon="mdi:wallet-outline" className="mr-2 text-indigo-600" width="24" height="24" />
                          E-Wallet
                        </h3>
                        <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                          Add E-Wallet
                        </button>
                      </div>
                      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
                        <Icon icon="mdi:wallet-off-outline" className="mx-auto mb-4 text-gray-400" width="48" height="48" />
                        <p className="text-gray-500">You don't have any e-wallets yet.</p>
                        <p className="text-gray-400 text-sm mt-2">Add an e-wallet for convenient payments</p>
                      </div>
                    </div>
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

export default BankandCard;