const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	})



try {
	sequelize.authenticate()
	console.log('Connection has been established!')
}
catch (error) {
	console.error('Unable to connect')
}


// sequelize.sync()

module.exports = sequelize