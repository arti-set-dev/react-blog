import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entitie/User';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const RequireAuth = ({ children }: {children: JSX.Element}) => {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  return children;
};
