import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface SettingsState {
  storeInfo: {
    storeName: string;
    email: string;
    phone: string;
    address: string;
    currency: string;
  };
  paymentSettings: {
    paymentMethods: string[];
    taxRate: number;
    enableTax: boolean;
  };
  shippingSettings: {
    shippingMethods: string[];
    defaultShippingFee: number;
    freeShippingThreshold: number;
  };
  notifications: {
    emailNotifications: boolean;
    orderNotifications: boolean;
    lowStockAlerts: boolean;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    storeInfo: {
      storeName: "IZAJ Store",
      email: "admin@izaj.com",
      phone: "0917-123-4567",
      address: "San Pablo",
      currency: "PHP",
    },
    paymentSettings: {
      paymentMethods: ["Cash on Delivery", "Credit Card", "GCash"],
      taxRate: 12,
      enableTax: true,
    },
    shippingSettings: {
      shippingMethods: ["Standard Shipping", "Express Shipping"],
      defaultShippingFee: 100,
      freeShippingThreshold: 1000,
    },
    notifications: {
      emailNotifications: true,
      orderNotifications: true,
      lowStockAlerts: true,
    },
  });

  const handleStoreInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSettings({
      ...settings,
      storeInfo: {
        ...settings.storeInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handlePaymentSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSettings({
      ...settings,
      paymentSettings: {
        ...settings.paymentSettings,
        [e.target.name]: value,
      },
    });
  };

  const handleShippingSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      shippingSettings: {
        ...settings.shippingSettings,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here
    alert("Settings updated successfully!");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Icon icon="mdi:cog" className="w-12 h-12 text-yellow-400" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Store Settings</h2>
            <p className="text-lg text-gray-600">Manage your store configuration</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Store Information Section */}
          <div className="bg-white rounded-2xl shadow-xl border-l-4 border-yellow-300 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Icon icon="mdi:store" className="text-yellow-400" />
              Store Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={settings.storeInfo.storeName}
                  onChange={handleStoreInfoChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={settings.storeInfo.email}
                  onChange={handleStoreInfoChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.storeInfo.phone}
                  onChange={handleStoreInfoChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Currency</label>
                <select
                  name="currency"
                  value={settings.storeInfo.currency}
                  onChange={handleStoreInfoChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition"
                >
                  <option value="PHP">PHP (₱)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Settings Section */}
          <div className="bg-white rounded-2xl shadow-xl border-l-4 border-yellow-300 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Icon icon="mdi:credit-card" className="text-yellow-400" />
              Payment Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="enableTax"
                  checked={settings.paymentSettings.enableTax}
                  onChange={handlePaymentSettingsChange}
                  className="w-4 h-4 text-yellow-400 focus:ring-yellow-200 border-gray-300 rounded"
                />
                <label className="text-gray-700 font-medium">Enable Tax</label>
              </div>
              {settings.paymentSettings.enableTax && (
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Tax Rate (%)</label>
                  <input
                    type="number"
                    name="taxRate"
                    value={settings.paymentSettings.taxRate}
                    onChange={handlePaymentSettingsChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Shipping Settings Section */}
          <div className="bg-white rounded-2xl shadow-xl border-l-4 border-yellow-300 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Icon icon="mdi:truck" className="text-yellow-400" />
              Shipping Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Default Shipping Fee</label>
                <input
                  type="number"
                  name="defaultShippingFee"
                  value={settings.shippingSettings.defaultShippingFee}
                  onChange={handleShippingSettingsChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Free Shipping Threshold</label>
                <input
                  type="number"
                  name="freeShippingThreshold"
                  value={settings.shippingSettings.freeShippingThreshold}
                  onChange={handleShippingSettingsChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings Section */}
          <div className="bg-white rounded-2xl shadow-xl border-l-4 border-yellow-300 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Icon icon="mdi:bell" className="text-yellow-400" />
              Notification Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.notifications.emailNotifications}
                  onChange={handleNotificationChange}
                  className="w-4 h-4 text-yellow-400 focus:ring-yellow-200 border-gray-300 rounded"
                />
                <label className="text-gray-700 font-medium">Email Notifications</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="orderNotifications"
                  checked={settings.notifications.orderNotifications}
                  onChange={handleNotificationChange}
                  className="w-4 h-4 text-yellow-400 focus:ring-yellow-200 border-gray-300 rounded"
                />
                <label className="text-gray-700 font-medium">Order Notifications</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="lowStockAlerts"
                  checked={settings.notifications.lowStockAlerts}
                  onChange={handleNotificationChange}
                  className="w-4 h-4 text-yellow-400 focus:ring-yellow-200 border-gray-300 rounded"
                />
                <label className="text-gray-700 font-medium">Low Stock Alerts</label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
