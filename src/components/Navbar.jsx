import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthComponents";
import { ButtonLink } from "./ui/ButtonLink";

// Componente de barra de navegación que se muestra en la parte superior de la aplicación.
export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-cyan-950 flex justify-between py-5 px-10">
      <h1 className="text-2xl font-bold text-gray-50">
        <Link to={isAuthenticated ? "/profile" : "/"}>Sistema de Gestión de Usuarios y Perfiles</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="text-gray-50">
              Bienvenido: {user.username}
            </li>
            <li className="text-gray-50">
              <ButtonLink to="/profile">Mi perfil</ButtonLink>
            </li>
            <li className="text-gray-50">
              <ButtonLink to="/profileForm">Crear perfil</ButtonLink>
            </li>
            <li className="text-gray-50">
              <Link to="/" onClick={() => logout()}>
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-gray-50">
              <ButtonLink  to="/login">Iniciar Sesión</ButtonLink>
            </li>
            <li className="text-gray-50">
              <ButtonLink to="/register">Registrarme</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
