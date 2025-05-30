import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
}

interface PrivateRouteProps {
  user: UserData | null;
  children: React.ReactNode;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user, children, setIsModalOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      if (setIsModalOpen) {
        setIsModalOpen(true);
      }
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    }
  }, [user, setIsModalOpen, navigate, location.pathname]);

  if (!user) return null;
  return <>{children}</>;
};

export default PrivateRoute; 