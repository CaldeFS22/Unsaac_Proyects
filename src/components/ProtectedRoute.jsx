import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Si no hay sesión → al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no coincide → Acceso denegado
  if (role && user.role !== role) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return children;
}