import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p>Loading...</p>;
  return user ? <Navigate to="/tasks" replace /> : children;
};

export default PublicRoute;
