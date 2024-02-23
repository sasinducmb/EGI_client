import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './userContext';


const ProtectedRoute = ({ children }) => {
  const { user, isLoading, error } = useContext(UserContext);
  let location = useLocation();

  if (error || !user) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export { ProtectedRoute}