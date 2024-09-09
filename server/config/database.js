const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('mydb', 'myuser', 'mypass', {
    host: 'localhost',
    dialect: 'postgres', // Use 'mysql', 'sqlite', 'mariadb', etc., depending on your database
    logging: false // Set to true to see SQL queries in the console
});

module.exports = sequelize;
