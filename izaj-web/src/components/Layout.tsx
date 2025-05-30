import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
  } | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAccountDropdownOpen: boolean;
  handleLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  user,
  setIsModalOpen,
  setIsAccountDropdownOpen,
  isAccountDropdownOpen,
  handleLogout
}) => {
  return (
    <div className="min-h-screen bg-white text-white font-sans overflow-x-hidden">
      <Header
        user={user}
        setIsModalOpen={setIsModalOpen}
        setIsAccountDropdownOpen={setIsAccountDropdownOpen}
        isAccountDropdownOpen={isAccountDropdownOpen}
        handleLogout={handleLogout}
      />
      <main className="p-0 mx-0 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 