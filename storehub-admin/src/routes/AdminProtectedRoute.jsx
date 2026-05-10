import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminProtectedRoute = ({
  children,
}) => {
  const { admin } = useAdminAuth();

  if (!admin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminProtectedRoute;