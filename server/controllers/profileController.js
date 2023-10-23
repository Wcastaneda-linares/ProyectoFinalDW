//server/controllers/profileController.js
import Profile from '../models/postgres/Profile.js';


const ProfileController = {
    // Crear un nuevo perfil
    async create(req, res) {
        try {
            const profile = await Profile.create(req.body);
            return res.status(201).json(profile);
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el perfil', error });
        }
    },

    // Obtener todos los perfiles
    async getAll(req, res) {
        try {
            const profiles = await Profile.findAll();
            return res.status(200).json(profiles);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los perfiles', error });
        }
    },

    // Obtener un perfil por ID
    async getById(req, res) {
        try {
            const profile = await Profile.findOne({ where: { user_id: req.params.id } });
            if (!profile) {
                return res.status(404).json({ message: 'Perfil no encontrado' });
            }
            return res.status(200).json(profile);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el perfil', error });
        }
    },
    

    // Actualizar un perfil
    async update(req, res) {
        try {
            const profile = await Profile.findByPk(req.params.id);
            if (!profile) {
                return res.status(404).json({ message: 'Perfil no encontrado' });
            }
            await profile.update(req.body);
            return res.status(200).json(profile);
        } catch (error) {
            return res.status(500).json({ message: 'Error al actualizar el perfil', error });
        }
    },

    // Eliminar un perfil
    async delete(req, res) {
        try {
            const profile = await Profile.findByPk(req.params.id);
            if (!profile) {
                return res.status(404).json({ message: 'Perfil no encontrado' });
            }
            await profile.destroy();
            return res.status(200).json({ message: 'Perfil eliminado con éxito' });
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el perfil', error });
        }
    }
};

export default ProfileController;
