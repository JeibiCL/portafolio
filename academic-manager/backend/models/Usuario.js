const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	correo: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	contraseña: {
		type: DataTypes.STRING,
		allowNull: false,
	},
},
{
	tableName: 'usuarios',
	timestamps: false,
});

module.exports = Usuario;