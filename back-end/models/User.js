const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importamos la conexión

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  googleId: {
    type: DataTypes.STRING, // Asegúrate de que el campo googleId esté presente
  },
});


module.exports = User;
