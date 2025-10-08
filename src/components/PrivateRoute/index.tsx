import React from "react";
import { Navigate } from 'react-router';
import routes from "../../utils/routes";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../Loading";

interface IPrivateRoute {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
  const user = useAuth();
  if (user === undefined) {
    return <Loading/>;
  }

  if (user === null) {
    return <Navigate to={routes.signIn} replace />;
  }

  return children;
};

export default PrivateRoute;