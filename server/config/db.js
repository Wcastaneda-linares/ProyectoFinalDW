//server/config/db.js
import mongoose from 'mongoose';
import pg from 'pg';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';


const { Pool } = pg;

dotenv.config();

const postgresPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10) || 5432
});

const connectDB = async () => {
  try {
    // Conexión a MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');

    // Conexión a PostgreSQL
    const client = await postgresPool.connect();
    if(client) {
      console.log('Conectado a PostgreSQL');
      client.release();  // Libera el cliente después de verificar la conexión
    }

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

export const TOKEN_SECRET = "ThisIsASecretToken";

export default { connectDB, postgresPool, sequelize };


