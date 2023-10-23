import axios from "./axios";


// Crear un nuevo perfil
export const createProfileRequest = async (profileData) => axios.post(`api/profile/profiles`, profileData);

// Obtener todos los perfiles
export const getAllProfilesRequest = async () => axios.get(`api/profile/profiles`);

// Obtener un perfil específico por su ID
export const getProfileByIdRequest = async (id) => axios.get(`api/profile/profiles/${id}`);

// Actualizar un perfil por su ID
export const updateProfileRequest = async (id, updatedProfileData) => axios.put(`api/profile/profiles/${id}`, updatedProfileData);

// Eliminar un perfil por su ID
export const deleteProfileRequest = async (id) => axios.delete(`api/profile/profiles/${id}`);
