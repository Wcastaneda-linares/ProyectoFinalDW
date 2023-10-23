import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./components/AuthComponents";
import ProtectedRoute from "../src/schemas/routes";

import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Profile from '../src/pages/Profile';
import Register from '../src/pages/Register';
import ProfileForm from '../src/pages/ProfileForm';
import './index.css';
import { ProfileProvider } from './components/PageComponets';

// Componente principal de la aplicación que contiene las rutas de la aplicación y componentes de autenticación.
function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profileForm" element={<ProfileForm />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
