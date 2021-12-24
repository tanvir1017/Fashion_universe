import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    <div>
      <img src="https://i.ibb.co/CsKCt7M/cogs.gif" alt="" />;
    </div>;
  }
  if (user.email) {
    return children;
  }
  return <Navigate to="/log_in" state={{ from: location }} />;
};
export default PrivateRoute;
