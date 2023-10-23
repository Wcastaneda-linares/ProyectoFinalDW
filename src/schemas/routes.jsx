import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/AuthComponents";

// Componente que protege las rutas de la aplicación.
export const ProtectedRoute = () => {
  const {user, isAuthenticated, loading } = useAuth();
  console.log("autenticado:",isAuthenticated, "cargando:",loading);
  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;