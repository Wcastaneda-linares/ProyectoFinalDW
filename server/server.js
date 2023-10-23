import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';
import router from './routes/userRoutes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import responseTime from 'express-response-time';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(responseTime((req, res, time) => {
  console.log(`${req.method} ${req.url} took ${time.toFixed(2)}ms`);
}));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // Habilita el uso de credenciales
};

app.use(bodyParser.json());

// Aplica CORS con las opciones correctas
app.use(cors(corsOptions));

// Rutas de la aplicación
app.use('/api/users', router);
app.use('/api/profile', profileRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

app.use(errorHandler);

// Conecta con la base de datos
db.connectDB();

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Escuchando desde el puerto ${PORT}`);
});
