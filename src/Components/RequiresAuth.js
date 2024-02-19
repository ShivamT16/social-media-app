import { useContext } from "react";
import { AuthContext } from "..";
import { Navigate } from "react-router-dom";

export const RequiresAuth = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
};
