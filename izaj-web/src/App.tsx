import React, { useState, useRef, useEffect } from "react";
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
import CookiePolicy from './pages/cookiepolicy';
import TermOfUse from './pages/termofuse';
import TermsOfPurchase from './pages/termsofpurchase';
import Delivery from './pages/delivery';
import PrivacyPolicy from './pages/privacypolicy';
import Return from './pages/return';
import Help from './pages/help';
import Term from './pages/term';
import Warranty from './pages/warranty';
import Career from './pages/career';
import Subscribe from './pages/subscribe';
import CookieConsent from './components/CookieConsent';
import "./App.css";

interface UserData {
  name: string;
  email: string;
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(() => {
    // Check for stored user data on initial load
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        return null;
      }
    }
    return null;
  });
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hello! How can we help you today?",
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFooterInView, setIsFooterInView] = useState(false);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (shouldAutoScroll && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, shouldAutoScroll]);

  // Handle manual scroll
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShouldAutoScroll(isAtBottom);
    }
  };

  const handleLogout = () => {
    // Clear stored data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    
    // Clear user state
    setUser(null);
    setIsAccountDropdownOpen(false);
  };

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    setIsModalOpen(false);
    setIsAccountDropdownOpen(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');

      // Simulate support response after 1 second
      setTimeout(() => {
        const supportMessage: ChatMessage = {
          text: "Thank you for your message. Our support team will get back to you shortly.",
          sender: 'support',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, supportMessage]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsFooterInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Cookie Consent - Placed outside Router to ensure it's always visible */}
      <CookieConsent />
      
      <Router>
        <Layout
          user={user}
          setUser={setUser}
          setIsModalOpen={setIsModalOpen}
          setIsAccountDropdownOpen={setIsAccountDropdownOpen}
          isAccountDropdownOpen={isAccountDropdownOpen}
          handleLogout={handleLogout}
          footerRef={footerRef}
        >
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/chatnow" element={<ChatNow />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/item-description/:id" element={<ItemDescription />} />
            <Route path="/cookiepolicy" element={<CookiePolicy />} />
            <Route path="/termofuse" element={<TermOfUse />} />
            <Route path="/termsofpurchase" element={<TermsOfPurchase />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/return" element={<Return />} />
            <Route path="/help" element={<Help />} />
            <Route path="/term" element={<Term />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/career" element={<Career />} />
            <Route path="/subscribe" element={<Subscribe />} />
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
            <div className="fixed inset-0 z-50">
              {/* Blurred overlay */}
              <div
                className="absolute inset-0 bg-black/40"
                style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
              />
              {/* Modal content */}
              <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
                <div className="w-full max-w-5xl mx-auto relative max-h-[80vh] overflow-y-auto">
                  <AuthForm
                    onAuthSuccess={handleLogin}
                    onClose={() => setIsModalOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Floating Chat Conversation */}
          {isChatOpen && (
            <div
              className="fixed bottom-24 right-8 z-50 w-80 bg-white rounded-xl shadow-2xl flex flex-col"
              style={{ 
                minHeight: "400px", 
                maxHeight: "70vh",
                height: "auto",
                display: "flex",
                flexDirection: "column"
              }}
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
              <div 
                ref={chatContainerRef}
                onScroll={handleScroll}
                className="flex-1 p-4 overflow-y-auto text-black scroll-smooth"
                style={{ 
                  fontFamily: "'Poppins', sans-serif",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#e5e7eb transparent",
                  minHeight: "200px"
                }}
              >
                {messages.map((message, index) => (
                  <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`inline-block rounded-lg p-2 max-w-[80%] ${
                        message.sender === 'user'
                          ? 'bg-yellow-400 ml-auto'
                          : 'bg-gray-100'
                      }`}
                    >
                      {message.text}
                    </div>
                    <div className={`text-xs text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                      {message.sender === 'user' ? 'You' : 'Support'} • {formatTime(message.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t bg-white flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400 bg-white text-black"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors whitespace-nowrap"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {!isFooterInView && (
            <button
              type="button"
              onClick={() => setIsChatOpen((v) => !v)}
              className={`fixed z-50 bottom-8 right-8 rounded-full p-4 hover:bg-orange-500 transition-colors animate-bounce-custom ${isModalOpen ? 'hidden' : ''}`}
              style={{
                backgroundColor: "#000000",
                boxShadow: "none",
              }}
              aria-label="Chat Now"
            >
              <Icon icon="mdi:message-text-outline" color="white" width="32" height="32" />
            </button>
          )}

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
    </>
  );
};

export default App;

