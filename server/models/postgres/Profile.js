// server/models/postgres/Profile.js
import { DataTypes, Model } from 'sequelize';
import db from '../../config/db.js';
const { sequelize } = db;

class Profile extends Model {}

// Definición del modelo de datos para el perfil de usuario
Profile.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING(255),
    },
    username: {
        type: DataTypes.STRING(255),
    },
    email: {
        type: DataTypes.STRING(255),
    },
    birth_date: {
        type: DataTypes.STRING(20),
    },
    ocupacion: { // Campo para DPI
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    dpi: { // Campo para DPI
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true // Asumo que quieres que el DPI sea único
    },
    biography: { // Campo para la descripción de biografía
        type: DataTypes.TEXT
    },
    profile_picture_url: {
        type: DataTypes.TEXT
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'profile',
    tableName: 'profiles',
    timestamps: false,
    underscored: true
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión con Sequelize establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar con la base de datos usando Sequelize:', err);
  });

export default Profile;
