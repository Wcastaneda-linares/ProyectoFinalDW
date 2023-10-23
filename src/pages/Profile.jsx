import React, { useEffect, useState } from "react";
import { ImFileEmpty } from 'react-icons/im';
import { useProfile } from '../components/PageComponets';
import { useAuth } from '../components/AuthComponents';

// Página de perfil de usuario
export function Profile() {
  const { getProfile } = useProfile();
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  // Obtener el perfil del usuario actual
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(user.id);
        setUserProfile(profileData);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };

    fetchProfile();
  }, [getProfile, user.id]);

  // Muestra los datos del perfil del usuario
  return (
    <div>
      {userProfile ? (
        <div className="flex justify-center items-center p-10 bg-gray-50 rounded-lg shadow-md">
    <div className="space-y-4 w-2/3">
        <p className="text-lg font-bold text-gray-700">Detalles del Perfil</p>
        <p className="border-b-2 border-gray-300 py-2"><span className="font-semibold">Username:</span> {userProfile.username}</p>
        <p className="border-b-2 border-gray-300 py-2"><span className="font-semibold">Email:</span> {userProfile.email}</p>
        <p className="border-b-2 border-gray-300 py-2"><span className="font-semibold">Fecha de nacimiento:</span> {userProfile.birth_date}</p>
        <p className="border-b-2 border-gray-300 py-2"><span className="font-semibold">DPI:</span> {userProfile.dpi}</p>
        <p className="border-b-2 border-gray-300 py-2"><span className="font-semibold">Id_Usuario:</span> {userProfile.user_id}</p>
        <p className="border-b-2 border-gray-300 py-2"><span className="font-semibold">Ocupación:</span> {userProfile.ocupacion || "N/A"}</p>
        <p className="border-b-2 border-gray-300 py-2"><span className="font-semibold">Biografía:</span> {userProfile.biography || "N/A"}</p>
        <p className="border-b-2 border-gray-300 py-2"><span className="font-semibold">Creado:</span> {userProfile.created_at}</p>
        <p className="border-b-2 border-gray-300 py-2"><span className="font-semibold">Actualizado:</span> {userProfile.updated_at}</p>
    </div>
</div>

      ) : (
        // Si no hay datos, muestra un mensaje
        <div className="flex justify-center items-center p-10">
          <div>
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay datos, Por favor ingresa tus datos
            </h1>
          </div>
        </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Profile;
