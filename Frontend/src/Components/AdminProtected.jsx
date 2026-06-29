import { Navigate } from "react-router-dom";

function AdminProtected({ children }) {
  const isAdmin = localStorage.getItem("adminLogin");

  if (!isAdmin) {
    return <Navigate to="/adminLogin" replace />;
  }

  return children;
}

export default AdminProtected;