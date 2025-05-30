import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './routes/PrivateRoute';
import AuthForm from './AuthForm';
import Cart from './pages/cart';
import MyFavorites from './pages/MyFavorites';
import MyPurchase from './pages/MyPurchase';
import MyProfile from './pages/MyProfile';
import Addresses from './pages/addresses';
import BanksCards from './pages/banks-cards';
import ChangePassword from './pages/change-password';
import Home from './components/Home';
import ProductList from './pages/product-list';
import ChatNow from './ChatNow';
import Collection from './pages/collection';
import Aboutus from './pages/aboutus';
import Contactus from './pages/contactus';
import Sales from './pages/sales';
import Checkout from './pages/checkout';
import ItemDescription from './pages/item-description';
import "./App.css";

interface UserData {
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogout = () => {
    setUser(null);
    setIsAccountDropdownOpen(false);
  };

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    setIsModalOpen(false);
    setIsAccountDropdownOpen(false);
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <Router>
      <Layout
        user={user}
        setIsModalOpen={setIsModalOpen}
        setIsAccountDropdownOpen={setIsAccountDropdownOpen}
        isAccountDropdownOpen={isAccountDropdownOpen}
        handleLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/chatnow" element={<ChatNow />} />
          <Route path="/new" element={<Collection />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/item-description" element={<ItemDescription />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute user={user}>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-favorites"
            element={
              <PrivateRoute user={user}>
                <MyFavorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-purchase"
            element={
              <PrivateRoute user={user}>
                <MyPurchase />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <PrivateRoute user={user}>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/addresses"
            element={
              <PrivateRoute user={user}>
                <Addresses />
              </PrivateRoute>
            }
          />
          <Route
            path="/banks-cards"
            element={
              <PrivateRoute user={user}>
                <BanksCards />
              </PrivateRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <PrivateRoute user={user}>
                <ChangePassword />
              </PrivateRoute>
            }
          />
        </Routes>

        {/* Auth Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-4xl mx-auto relative">
              
              <AuthForm
                isLoginForm={isLoginForm}
                toggleForm={toggleForm}
                onLogin={handleLogin}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Floating Chat Conversation */}
        {isChatOpen && (
          <div
            className="fixed bottom-24 right-8 z-50 w-80 bg-white rounded-xl shadow-2xl flex flex-col"
            style={{ minHeight: "400px", maxHeight: "70vh" }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-yellow-400 rounded-t-xl">
              <span className="font-bold text-black">Chat with Us</span>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-black hover:text-red-500"
                aria-label="Close Chat"
              >
                <Icon icon="mdi:close" width="20" height="20" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {/* Placeholder conversation */}
              <div className="mb-2">
                <div className="bg-gray-100 rounded-lg p-2 mb-1 w-fit">Hello! How can we help you today?</div>
                <div className="text-xs text-gray-400">Support • just now</div>
              </div>
              {/* Add more messages or connect to real chat here */}
            </div>
            <div className="p-3 border-t flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
                disabled
              />
              <button
                className="bg-yellow-400 text-black px-4 py-2 rounded-r-lg font-bold"
                disabled
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Floating Messages Icon with bounce effect (no shadow while bouncing) */}
        <button
          type="button"
          onClick={() => setIsChatOpen((v) => !v)}
          className="fixed z-50 bottom-8 right-8 rounded-full p-4 hover:bg-orange-500 transition-colors animate-bounce-custom"
          style={{
            backgroundColor: "#000000",
            boxShadow: "none",
          }}
          aria-label="Chat Now"
        >
          <Icon icon="mdi:message-text-outline" color="white" width="32" height="32" />
        </button>
        {/* Custom bounce animation */}
        <style>
          {`
            @keyframes soft-bounce {
              0%, 100% { transform: translateY(0);}
              20% { transform: translateY(-14px);}
              40% { transform: translateY(0);}
              60% { transform: translateY(-7px);}
              80% { transform: translateY(0);}
            }
            .animate-bounce-custom {
              animation: soft-bounce 1.5s cubic-bezier(0.45, 0, 0.55, 1) infinite;
            }
          `}
        </style>
      </Layout>
    </Router>
  );
};

export default App;

