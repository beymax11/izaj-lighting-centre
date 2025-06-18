import React from "react";
import Login from "../pages/login";

interface PrivateRouteProps {
  isLoggedIn: boolean;
  onLogin: (sessionData: any) => void;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isLoggedIn, onLogin, children }) => {
  if (!isLoggedIn) {
    return <Login onLogin={onLogin} />;
  }
  return <>{children}</>;
};

export default PrivateRoute;