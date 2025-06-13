const { Sequelize } = require('sequelize');

// Configura la conexión con PostgreSQL
const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
  logging: false, // Opcional, desactiva los logs de SQL si no los necesitas
});

module.exports = sequelize;
