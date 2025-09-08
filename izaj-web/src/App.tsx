import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './routes/PrivateRoute';
import AuthForm from './AuthForm';
import Cart from './pages/cart';
import MyFavorites from './pages/MyFavorites';
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

const App: React.FC = () => {
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(() => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    setUser(null);
    setIsAccountDropdownOpen(false);
  };

  const handleLogin = (userData: { firstName: string; lastName: string; email: string }) => {
    setUser(userData);
    // Persist user info for session and reloads
    localStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('user', JSON.stringify(userData));
    setIsModalOpen(false);
    setIsAccountDropdownOpen(false);
  };

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
          {/* Removed floating chat component as requested */}
        </Layout>
      </Router>
    </>
  );
};

export default App;

