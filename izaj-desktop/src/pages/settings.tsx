import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Session } from "@supabase/supabase-js";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'blocked';
  lastLogin: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface SettingsState {
  general: {
    websiteName: string;
    logo: string;
    favicon: string;
    timezone: string;
    language: string;
    currency: string;
    storeAddress: string;
  };
  userManagement: {
    adminUsers: AdminUser[];
    customerAccounts: CustomerAccount[];
    roles: Role[];
  };
}

interface SettingsProps {
  handleNavigation?: (page: string) => void;
  session: Session | null;
}

const Settings: React.FC<SettingsProps> = ({ handleNavigation, session }) => {

  console.log("Settings Session",  session?.user.id);
  
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<SettingsState>({
    general: {
      websiteName: "IZAJ Store",
      logo: "",
      favicon: "",
      timezone: "Asia/Manila",
      language: "English",
      currency: "PHP",
      storeAddress: "San Pablo",
    },
    userManagement: {
      adminUsers: [],
      customerAccounts: [],
      roles: [],
    }
  });

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'general', label: 'General', icon: 'mdi:cog' },
    { id: 'userManagement', label: 'User Management', icon: 'mdi:account-group' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            {isMobileView && (
              <button
                onClick={() => handleNavigation?.('DASHBOARD')}
                className="p-2 hover:bg-yellow-50 rounded-lg transition"
              >
                <Icon icon="mdi:arrow-left" className="w-6 h-6 text-gray-600" />
              </button>
            )}
            <h2 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-bold text-gray-800">
              <Icon icon="mdi:cog" className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
              Settings
            </h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 whitespace-nowrap
                      ${activeTab === tab.id
                        ? 'border-yellow-400 text-yellow-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon icon={tab.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6">
              <form onSubmit={handleSave} className="space-y-6 sm:space-y-8">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Website Name</label>
                        <input
                          type="text"
                          value={settings.general.websiteName}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, websiteName: e.target.value }
                          })}
                          className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Timezone</label>
                        <select
                          value={settings.general.timezone}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, timezone: e.target.value }
                          })}
                          className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                        >
                          <option value="Asia/Manila">Asia/Manila</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Language</label>
                        <select
                          value={settings.general.language}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, language: e.target.value }
                          })}
                          className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                        >
                          <option value="English">English</option>
                          <option value="Filipino">Filipino</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Currency</label>
                        <select
                          value={settings.general.currency}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, currency: e.target.value }
                          })}
                          className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                        >
                          <option value="PHP">PHP (₱)</option>
                          <option value="USD">USD ($)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Store Address</label>
                      <textarea
                        value={settings.general.storeAddress}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, storeAddress: e.target.value }
                        })}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Logo</label>
                      <div className="mt-1 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <Icon icon="mdi:upload" className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                          <div className="flex flex-col sm:flex-row text-sm text-gray-600 items-center gap-1 sm:gap-0">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none">
                              <span>Upload a file</span>
                              <input type="file" className="sr-only" />
                            </label>
                            <p className="sm:pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* User Management Settings */}
                {activeTab === 'userManagement' && (
                  <div className="space-y-6 sm:space-y-8">
                    {/* Admin Users Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:account-tie" className="text-yellow-400" />
                          Admin Users
                        </h3>
                        <button className="px-3 sm:px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center justify-center gap-2">
                          <Icon icon="mdi:plus" className="w-4 h-4 sm:w-5 sm:h-5" />
                          Add Admin
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {settings.userManagement.adminUsers.map((user) => (
                              <tr key={user.id}>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <Icon icon="mdi:account" className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" />
                                      </div>
                                    </div>
                                    <div className="ml-3 sm:ml-4">
                                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{user.email}</div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {user.role}
                                  </span>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                    <Icon icon="mdi:pencil" className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Icon icon="mdi:delete" className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Customer Accounts Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:account-group" className="text-yellow-400" />
                          Customer Accounts
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Search customers..."
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                            />
                            <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <button className="px-3 sm:px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center justify-center gap-2">
                            <Icon icon="mdi:filter" className="w-4 h-4 sm:w-5 sm:h-5" />
                            Filter
                          </button>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {settings.userManagement.customerAccounts.map((customer) => (
                              <tr key={customer.id}>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <Icon icon="mdi:account" className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" />
                                      </div>
                                    </div>
                                    <div className="ml-3 sm:ml-4">
                                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{customer.email}</div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{customer.lastLogin}</div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {customer.status}
                                  </span>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                    <Icon icon="mdi:pencil" className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Icon icon="mdi:delete" className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Role Management Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:shield-account" className="text-yellow-400" />
                          Role Management
                        </h3>
                        <button className="px-3 sm:px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center justify-center gap-2">
                          <Icon icon="mdi:plus" className="w-4 h-4 sm:w-5 sm:h-5" />
                          Add Role
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {settings.userManagement.roles.map((role) => (
                          <div key={role.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-base sm:text-lg font-medium text-gray-900">{role.name}</h4>
                              <div className="flex gap-2">
                                <button className="text-yellow-600 hover:text-yellow-900">
                                  <Icon icon="mdi:pencil" className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Icon icon="mdi:delete" className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {role.permissions.map((permission, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Icon icon="mdi:check-circle" className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                                  <span className="text-sm text-gray-600">{permission}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-yellow-400 text-white font-medium rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
