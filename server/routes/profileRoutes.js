//server/routes/profileRoutes.js
import express from 'express';
import ProfileController from '../controllers/profileController.js';

const router = express.Router();

// Rutas para los perfiles de usuario
router.post('/profiles', ProfileController.create);
router.get('/profiles', ProfileController.getAll);
router.get('/profiles/:id', ProfileController.getById);
router.put('/profiles/:id', ProfileController.update);
router.delete('/profiles/:id', ProfileController.delete);


export default router;
