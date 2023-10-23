import { createContext, useContext, useState } from "react";
import {
  createProfileRequest,
  getAllProfilesRequest,
  getProfileByIdRequest,
  updateProfileRequest,
  deleteProfileRequest
} from "../api/profile";

const ProfileContext = createContext();

// Hook personalizado que permite a los componentes acceder al contexto de tareas.
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};

// Proveedor de tareas que envuelve a los componentes y provee datos relacionados con las tareas.
export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState([]);

  const getProfiles = async () => {
    const res = await getAllProfilesRequest();
    setProfiles(res.data);
  };

  //para eliminar un perfil
  const deleteProfile = async (id) => {
    try {
      const res = await deleteProfileRequest(id);
      if (res.status === 204) setProfiles(profiles.filter((profile) => profile.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //para crear un perfil
  const createProfile = async (profile) => {
    try {
        const res = await createProfileRequest(profile);
        setProfiles(prevProfiles => [...prevProfiles, res.data]);
    } catch (error) {
        console.log(error);
        console.error("Error Data:", error.response?.data);
        console.error("Error Status:", error.response?.status);
        console.error("General Error:", error.message);
    }
};

//para obtener un perfil por id
const getProfile = async (id) => {
  try {
    const res = await getProfileByIdRequest(id);
    console.log("Respuesta del perfil:", res);
    if (res && res.data) {
      return res.data;
    } else {
      console.warn("No se encontró datos en la respuesta del perfil.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    return null;
  }
};


  //para actualizar un perfil por id
  const updateProfile = async (id, profile) => {
    try {
      await updateProfileRequest(id, profile);
    } catch (error) {
      console.error(error);
    }
  };

  // Provee el listado de tareas a los componentes envueltos.
  return (
    <ProfileContext.Provider
      value={{
        profiles,
        getProfiles,
        deleteProfile,
        createProfile,
        getProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
