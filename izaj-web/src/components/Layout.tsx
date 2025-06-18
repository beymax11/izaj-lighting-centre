import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<{ firstName: string; lastName: string; email: string; } | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAccountDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAccountDropdownOpen: boolean;
  handleLogout: () => void;
  footerRef: React.RefObject<HTMLDivElement>;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  user,
  setUser,
  setIsModalOpen,
  setIsAccountDropdownOpen,
  isAccountDropdownOpen,
  handleLogout,
  footerRef
}) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header
        user={user}
        setUser={setUser}
        setIsModalOpen={setIsModalOpen}
        setIsAccountDropdownOpen={setIsAccountDropdownOpen}
        isAccountDropdownOpen={isAccountDropdownOpen}
        handleLogout={handleLogout}
      />
      <main className="p-0 mx-0 w-full">
        {children}
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 