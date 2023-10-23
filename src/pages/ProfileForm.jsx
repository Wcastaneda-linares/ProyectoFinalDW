import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useProfile } from "../components/PageComponets";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/AuthComponents"; 
dayjs.extend(utc);

// Formulario para crear o actualizar el perfil de usuario
function ProfileForm() {
  const { user } = useAuth();
  const { createProfile, getProfile, updateProfile } = useProfile();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Función para crear o actualizar el perfil
  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        email: user.email,
        user_id: user.id,
        username: user.username,
        birth_date: dayjs.utc(data.date).format(),
        biography: data.description,
        ocupacion: data.ocupacion,
      };
  
      if (params.id) {
        updateProfile(params.id, formData);
      } else {
        createProfile(formData);
      }
  
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  
  // Cargar el perfil si se está editando
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Cargar el perfil basado en el usuario logueado
        const profile = await getProfile(user.id);
        if (profile) { // Comprobar si se ha obtenido un perfil
          setValue("ocupacion", profile.ocupacion);
          setValue("description", profile.biography);
          
          setValue(
            "date",
            profile.birth_date ? dayjs(profile.birth_date).utc().format("YYYY-MM-DD") : ""
          );
          setValue("dpi", profile.dpi);
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };
    
    loadProfile();
  }, [user.id, setValue, getProfile]);
  
  // Formulario para crear o actualizar el perfil
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="ocupacion">Profesión u ocupación</Label>
        <Input
          id="ocupacion"
          type="text"
          name="ocupacion"
          placeholder="Profesión u ocupación..."
          {...register("ocupacion")}
          autoFocus
        />
        {errors.ocupacion && (
          <p className="text-red-500 text-xs italic">Por favor ingrese una profesión.</p>
        )}

        <Label htmlFor="dpi">DPI</Label>
        <Input
        id="dpi"
          type="text"
          name="dpi"
          placeholder="Ingrese CUI sin espacios..."
          {...register("dpi")}
        />
        {errors.dpi && (
          <p className="text-red-500 text-xs italic">Por favor ingrese un CUI.</p>
        )}

        <Label htmlFor="description">Biografía</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Biografía..."
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Fecha de Nacimiento</Label>
        <Input 
        id="date"
        type="date" 
        name="date" 
        {...register("date")} />
        
        <Button>Guardar</Button>
      </form>
    </Card>
    </div>
  );
}

export default ProfileForm;
