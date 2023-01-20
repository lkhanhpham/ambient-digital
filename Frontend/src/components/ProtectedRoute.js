import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
/**
 * To navigate user to login if not logged in and user tries to access protected Link
 * @param {Child Links} param
 * @returns children
 */
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/Login" />;
  }
  return children;
};
