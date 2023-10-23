//src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

// Página de inicio de la aplicación.
function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Página de Inicio</h1>
      <p className="home-description">Bienvenido al Sistema de Gestión de Usuarios y Perfiles</p>
      <div className="button-container">
        <Link to="/login" className="home-button">
          Iniciar Sesión
        </Link>
        <Link to="/register" className="home-button">
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default Home;
