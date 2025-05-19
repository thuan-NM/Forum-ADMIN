import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface AuthState {
  auth: {
    isAuth: boolean;
  };
}

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = useAppSelector((state: AuthState) => state.auth.isAuth);
  return isAuth ? <>{children}</> : <Navigate to="/auth" />;
};

export default PrivateRoute;
