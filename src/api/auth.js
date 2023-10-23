import axios from "./axios";

// Registro de un usuario
export const registerRequest = async (user) => axios.post(`api/users/register`, user);

// Iniciar sesión
export const loginRequest = async (user) => axios.post(`api/users/login`, user);

// Verificar token
export const verifyTokenRequest = async (token) => {
    return axios.get(`/api/users/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

// Obtener todos los usuarios
export const getAllUsersRequest = async () => axios.get(`api/users/user`);

// Cerrar sesión
export const logoutRequest = async () => axios.post(`api/users/logout`);