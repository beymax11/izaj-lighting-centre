import React, { useState } from "react";
import { Icon } from "@iconify/react";

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

interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
}

interface Attribute {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'color' | 'size';
  options?: string[];
}

interface Variation {
  id: string;
  name: string;
  attributes: {
    [key: string]: string;
  };
  price: number;
  stock: number;
}

interface ShippingRate {
  id: string;
  name: string;
  price: number;
  minOrderValue: number;
  maxOrderValue: number;
  estimatedDays: number;
}

interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  states?: string[];
  cities?: string[];
}

interface TaxRate {
  id: string;
  name: string;
  rate: number;
  country: string;
  state?: string;
}

interface TaxExemption {
  id: string;
  name: string;
  type: 'customer' | 'product' | 'category';
  referenceId: string;
}

interface TaxClass {
  id: string;
  name: string;
  rate: number;
  description: string;
}

interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usedCount: number;
}

interface MenuItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
  children?: MenuItem[];
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
  product: {
    categories: Category[];
    attributes: Attribute[];
    inventorySettings: {
      lowStockAlert: number;
      autoRestock: boolean;
    };
    variations: Variation[];
  };
  payment: {
    paymentMethods: string[];
    taxRate: number;
    refundPolicy: string;
    paymentTerms: string;
  };
  shipping: {
    methods: string[];
    rates: ShippingRate[];
    trackingEnabled: boolean;
    zones: ShippingZone[];
  };
  tax: {
    rates: TaxRate[];
    exemptions: TaxExemption[];
    taxClasses: TaxClass[];
  };
  order: {
    statuses: string[];
    notifications: boolean;
    historyEnabled: boolean;
    shippingLabels: boolean;
  };
  marketing: {
    discountCodes: DiscountCode[];
    emailMarketing: boolean;
    affiliateProgram: boolean;
    loyaltyProgram: boolean;
  };
  seo: {
    titleTags: string;
    metaDescription: string;
    analyticsEnabled: boolean;
    performanceTracking: boolean;
  };
  security: {
    sslEnabled: boolean;
    twoFactorAuth: boolean;
    privacyPolicy: string;
    gdprCompliant: boolean;
    backupSchedule: string;
  };
  theme: {
    customTheme: boolean;
    homePageLayout: string;
    menuStructure: MenuItem[];
  };
  support: {
    liveChat: boolean;
    contactForms: boolean;
    helpCenter: boolean;
  };
  legal: {
    termsConditions: string;
    returnPolicy: string;
    cookiePolicy: string;
  };
}

const Settings: React.FC = () => {
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
    },
    product: {
      categories: [],
      attributes: [],
      inventorySettings: {
        lowStockAlert: 10,
        autoRestock: false,
      },
      variations: [],
    },
    payment: {
      paymentMethods: ["Cash on Delivery", "Credit Card", "GCash"],
      taxRate: 12,
      refundPolicy: "",
      paymentTerms: "",
    },
    shipping: {
      methods: ["Standard Shipping", "Express Shipping"],
      rates: [],
      trackingEnabled: true,
      zones: [],
    },
    tax: {
      rates: [],
      exemptions: [],
      taxClasses: [],
    },
    order: {
      statuses: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      notifications: true,
      historyEnabled: true,
      shippingLabels: true,
    },
    marketing: {
      discountCodes: [],
      emailMarketing: false,
      affiliateProgram: false,
      loyaltyProgram: false,
    },
    seo: {
      titleTags: "",
      metaDescription: "",
      analyticsEnabled: false,
      performanceTracking: false,
    },
    security: {
      sslEnabled: true,
      twoFactorAuth: false,
      privacyPolicy: "",
      gdprCompliant: false,
      backupSchedule: "daily",
    },
    theme: {
      customTheme: false,
      homePageLayout: "default",
      menuStructure: [],
    },
    support: {
      liveChat: false,
      contactForms: true,
      helpCenter: false,
    },
    legal: {
      termsConditions: "",
      returnPolicy: "",
      cookiePolicy: "",
    },
  });

  const tabs = [
    { id: 'general', label: 'General', icon: 'mdi:cog' },
    { id: 'userManagement', label: 'User Management', icon: 'mdi:account-group' },
    { id: 'product', label: 'Product', icon: 'mdi:package-variant' },
    { id: 'payment', label: 'Payment', icon: 'mdi:credit-card' },
    { id: 'shipping', label: 'Shipping', icon: 'mdi:truck' },
    { id: 'tax', label: 'Tax', icon: 'mdi:calculator' },
    { id: 'order', label: 'Order', icon: 'mdi:clipboard-list' },
    { id: 'marketing', label: 'Marketing', icon: 'mdi:bullhorn' },
    { id: 'seo', label: 'SEO', icon: 'mdi:chart-line' },
    { id: 'security', label: 'Security', icon: 'mdi:shield' },
    { id: 'theme', label: 'Theme', icon: 'mdi:palette' },
    { id: 'support', label: 'Support', icon: 'mdi:help-circle' },
    { id: 'legal', label: 'Legal', icon: 'mdi:gavel' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Header */}
      <header className="px-8 py-6 bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
            <Icon icon="mdi:cog" className="text-yellow-400 w-8 h-8" />
            Settings
          </h2>
          
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                      ${activeTab === tab.id
                        ? 'border-yellow-400 text-yellow-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon icon={tab.icon} className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <form onSubmit={handleSave} className="space-y-8">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Website Name</label>
                        <input
                          type="text"
                          value={settings.general.websiteName}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, websiteName: e.target.value }
                          })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
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
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
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
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
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
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
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
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Logo</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <Icon icon="mdi:upload" className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none">
                              <span>Upload a file</span>
                              <input type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* User Management Settings */}
                {activeTab === 'userManagement' && (
                  <div className="space-y-8">
                    {/* Admin Users Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:account-tie" className="text-yellow-400" />
                          Admin Users
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Admin
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {settings.userManagement.adminUsers.map((user) => (
                              <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <Icon icon="mdi:account" className="w-6 h-6 text-gray-500" />
                                      </div>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {user.role}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                    <Icon icon="mdi:pencil" className="w-5 h-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Icon icon="mdi:delete" className="w-5 h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Customer Accounts Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:account-group" className="text-yellow-400" />
                          Customer Accounts
                        </h3>
                        <div className="flex gap-4">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Search customers..."
                              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                            />
                            <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          </div>
                          <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                            <Icon icon="mdi:filter" className="w-5 h-5" />
                            Filter
                          </button>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {settings.userManagement.customerAccounts.map((customer) => (
                              <tr key={customer.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <Icon icon="mdi:account" className="w-6 h-6 text-gray-500" />
                                      </div>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{customer.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{customer.lastLogin}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {customer.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                    <Icon icon="mdi:pencil" className="w-5 h-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Icon icon="mdi:delete" className="w-5 h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Role Management Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:shield-account" className="text-yellow-400" />
                          Role Management
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Role
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {settings.userManagement.roles.map((role) => (
                          <div key={role.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-medium text-gray-900">{role.name}</h4>
                              <div className="flex gap-2">
                                <button className="text-yellow-600 hover:text-yellow-900">
                                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Icon icon="mdi:delete" className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {role.permissions.map((permission, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-500" />
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

                {/* Product Settings */}
                {activeTab === 'product' && (
                  <div className="space-y-8">
                    {/* Categories Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:shape" className="text-yellow-400" />
                          Product Categories
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Category
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {settings.product.categories.map((category) => (
                          <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-medium text-gray-900">{category.name}</h4>
                              <div className="flex gap-2">
                                <button className="text-yellow-600 hover:text-yellow-900">
                                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Icon icon="mdi:delete" className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                            {category.parentId && (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Icon icon="mdi:subdirectory-arrow-right" className="w-4 h-4" />
                                <span>Subcategory of {category.parentId}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Attributes Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:format-list-bulleted" className="text-yellow-400" />
                          Product Attributes
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Attribute
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {settings.product.attributes.map((attribute) => (
                              <tr key={attribute.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{attribute.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {attribute.type}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex flex-wrap gap-2">
                                    {attribute.options?.map((option, index) => (
                                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                                        {option}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                    <Icon icon="mdi:pencil" className="w-5 h-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Icon icon="mdi:delete" className="w-5 h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Inventory Settings Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:package-variant" className="text-yellow-400" />
                          Inventory Settings
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Low Stock Alert</label>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={settings.product.inventorySettings.lowStockAlert}
                                onChange={(e) => setSettings({
                                  ...settings,
                                  product: {
                                    ...settings.product,
                                    inventorySettings: {
                                      ...settings.product.inventorySettings,
                                      lowStockAlert: Number(e.target.value)
                                    }
                                  }
                                })}
                                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                              />
                              <span className="text-sm text-gray-500">units</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Auto Restock</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings.product.inventorySettings.autoRestock}
                                onChange={(e) => setSettings({
                                  ...settings,
                                  product: {
                                    ...settings.product,
                                    inventorySettings: {
                                      ...settings.product.inventorySettings,
                                      autoRestock: e.target.checked
                                    }
                                  }
                                })}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Variations Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:layers" className="text-yellow-400" />
                          Product Variations
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Variation
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attributes</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {settings.product.variations.map((variation) => (
                              <tr key={variation.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{variation.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex flex-wrap gap-2">
                                    {Object.entries(variation.attributes).map(([key, value]) => (
                                      <span key={key} className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                                        {key}: {value}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">₱{variation.price}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{variation.stock} units</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                    <Icon icon="mdi:pencil" className="w-5 h-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Icon icon="mdi:delete" className="w-5 h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Settings */}
                {activeTab === 'payment' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Payment Methods</label>
                      <div className="space-y-2">
                        {settings.payment.paymentMethods.map((method, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={true}
                              className="h-4 w-4 text-yellow-400 focus:ring-yellow-200 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">{method}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
                        <input
                          type="number"
                          value={settings.payment.taxRate}
                          onChange={(e) => setSettings({
                            ...settings,
                            payment: { ...settings.payment, taxRate: Number(e.target.value) }
                          })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Shipping Settings */}
                {activeTab === 'shipping' && (
                  <div className="space-y-8">
                    {/* Shipping Methods Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:truck" className="text-yellow-400" />
                          Shipping Methods
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Method
                        </button>
                      </div>
                      <div className="space-y-4">
                        {settings.shipping.methods.map((method, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={true}
                                className="h-4 w-4 text-yellow-400 focus:ring-yellow-200 border-gray-300 rounded"
                              />
                              <span className="text-sm font-medium text-gray-900">{method}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-yellow-600 hover:text-yellow-900">
                                <Icon icon="mdi:pencil" className="w-5 h-5" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Icon icon="mdi:delete" className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Zones Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:map-marker" className="text-yellow-400" />
                          Shipping Zones
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Zone
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {settings.shipping.zones.map((zone) => (
                          <div key={zone.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-medium text-gray-900">{zone.name}</h4>
                              <div className="flex gap-2">
                                <button className="text-yellow-600 hover:text-yellow-900">
                                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Icon icon="mdi:delete" className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-2">
                                {zone.countries.map((country, index) => (
                                  <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                                    {country}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Rates Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:currency-usd" className="text-yellow-400" />
                          Shipping Rates
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Rate
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Value</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {settings.shipping.rates.map((rate) => (
                              <tr key={rate.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{rate.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">₱{rate.price}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    ₱{rate.minOrderValue} - ₱{rate.maxOrderValue}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{rate.estimatedDays} days</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                    <Icon icon="mdi:pencil" className="w-5 h-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Icon icon="mdi:delete" className="w-5 h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Tracking Settings */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:map-search" className="text-yellow-400" />
                          Tracking Settings
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Enable Order Tracking</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.shipping.trackingEnabled}
                              onChange={(e) => setSettings({
                                ...settings,
                                shipping: {
                                  ...settings.shipping,
                                  trackingEnabled: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tax Settings */}
                {activeTab === 'tax' && (
                  <div className="space-y-8">
                    {/* Tax Rates Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:calculator" className="text-yellow-400" />
                          Tax Rates
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Rate
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {settings.tax.rates.map((rate) => (
                              <tr key={rate.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{rate.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{rate.rate}%</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{rate.country}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{rate.state || '-'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                    <Icon icon="mdi:pencil" className="w-5 h-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Icon icon="mdi:delete" className="w-5 h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Tax Classes Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:tag-multiple" className="text-yellow-400" />
                          Tax Classes
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Class
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {settings.tax.taxClasses.map((taxClass) => (
                          <div key={taxClass.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-lg font-medium text-gray-900">{taxClass.name}</h4>
                              <div className="flex gap-2">
                                <button className="text-yellow-600 hover:text-yellow-900">
                                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Icon icon="mdi:delete" className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{taxClass.description}</p>
                            <div className="text-sm font-medium text-gray-900">Rate: {taxClass.rate}%</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tax Exemptions Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:shield-check" className="text-yellow-400" />
                          Tax Exemptions
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Exemption
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {settings.tax.exemptions.map((exemption) => (
                              <tr key={exemption.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{exemption.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {exemption.type}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{exemption.referenceId}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                    <Icon icon="mdi:pencil" className="w-5 h-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Icon icon="mdi:delete" className="w-5 h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Settings */}
                {activeTab === 'order' && (
                  <div className="space-y-8">
                    {/* Order Statuses Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:clipboard-list" className="text-yellow-400" />
                          Order Statuses
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Status
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {settings.order.statuses.map((status, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <span className="text-sm font-medium text-gray-900">{status}</span>
                              </div>
                              <div className="flex gap-2">
                                <button className="text-yellow-600 hover:text-yellow-900">
                                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Icon icon="mdi:delete" className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Settings Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:cog" className="text-yellow-400" />
                          Order Settings
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Enable Order Notifications</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.order.notifications}
                              onChange={(e) => setSettings({
                                ...settings,
                                order: {
                                  ...settings.order,
                                  notifications: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Enable Order History</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.order.historyEnabled}
                              onChange={(e) => setSettings({
                                ...settings,
                                order: {
                                  ...settings.order,
                                  historyEnabled: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Enable Shipping Labels</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.order.shippingLabels}
                              onChange={(e) => setSettings({
                                ...settings,
                                order: {
                                  ...settings.order,
                                  shippingLabels: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Marketing Settings */}
                {activeTab === 'marketing' && (
                  <div className="space-y-8">
                    {/* Discount Codes Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:tag-multiple" className="text-yellow-400" />
                          Discount Codes
                        </h3>
                        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 flex items-center gap-2">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                          Add Code
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {settings.marketing.discountCodes.map((code) => (
                              <tr key={code.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{code.code}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {code.type}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {code.type === 'percentage' ? `${code.value}%` : `₱${code.value}`}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {code.usedCount}/{code.usageLimit || '∞'}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {new Date(code.startDate).toLocaleDateString()} - {new Date(code.endDate).toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                    <Icon icon="mdi:pencil" className="w-5 h-5" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Icon icon="mdi:delete" className="w-5 h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Marketing Features Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:bullhorn" className="text-yellow-400" />
                          Marketing Features
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Email Marketing</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.marketing.emailMarketing}
                              onChange={(e) => setSettings({
                                ...settings,
                                marketing: {
                                  ...settings.marketing,
                                  emailMarketing: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Affiliate Program</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.marketing.affiliateProgram}
                              onChange={(e) => setSettings({
                                ...settings,
                                marketing: {
                                  ...settings.marketing,
                                  affiliateProgram: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Loyalty Program</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.marketing.loyaltyProgram}
                              onChange={(e) => setSettings({
                                ...settings,
                                marketing: {
                                  ...settings.marketing,
                                  loyaltyProgram: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SEO Settings */}
                {activeTab === 'seo' && (
                  <div className="space-y-8">
                    {/* SEO Basics Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:chart-line" className="text-yellow-400" />
                          SEO Basics
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Title Tags</label>
                          <input
                            type="text"
                            value={settings.seo.titleTags}
                            onChange={(e) => setSettings({
                              ...settings,
                              seo: {
                                ...settings.seo,
                                titleTags: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                            placeholder="Enter title tags"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                          <textarea
                            value={settings.seo.metaDescription}
                            onChange={(e) => setSettings({
                              ...settings,
                              seo: {
                                ...settings.seo,
                                metaDescription: e.target.value
                              }
                            })}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                            placeholder="Enter meta description"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Analytics Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:chart-bar" className="text-yellow-400" />
                          Analytics
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Enable Analytics</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.seo.analyticsEnabled}
                              onChange={(e) => setSettings({
                                ...settings,
                                seo: {
                                  ...settings.seo,
                                  analyticsEnabled: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Performance Tracking</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.seo.performanceTracking}
                              onChange={(e) => setSettings({
                                ...settings,
                                seo: {
                                  ...settings.seo,
                                  performanceTracking: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    {/* Security Features Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:shield" className="text-yellow-400" />
                          Security Features
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">SSL Enabled</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.security.sslEnabled}
                              onChange={(e) => setSettings({
                                ...settings,
                                security: {
                                  ...settings.security,
                                  sslEnabled: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.security.twoFactorAuth}
                              onChange={(e) => setSettings({
                                ...settings,
                                security: {
                                  ...settings.security,
                                  twoFactorAuth: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">GDPR Compliant</label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.security.gdprCompliant}
                              onChange={(e) => setSettings({
                                ...settings,
                                security: {
                                  ...settings.security,
                                  gdprCompliant: e.target.checked
                                }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Privacy Policy Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:file-document" className="text-yellow-400" />
                          Privacy Policy
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Privacy Policy Content</label>
                          <textarea
                            value={settings.security.privacyPolicy}
                            onChange={(e) => setSettings({
                              ...settings,
                              security: {
                                ...settings.security,
                                privacyPolicy: e.target.value
                              }
                            })}
                            rows={6}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                            placeholder="Enter privacy policy content"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Backup Settings Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <Icon icon="mdi:backup-restore" className="text-yellow-400" />
                          Backup Settings
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Backup Schedule</label>
                          <select
                            value={settings.security.backupSchedule}
                            onChange={(e) => setSettings({
                              ...settings,
                              security: {
                                ...settings.security,
                                backupSchedule: e.target.value
                              }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-400 text-white font-medium rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2"
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
