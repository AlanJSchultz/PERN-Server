//jshint esversion:6

const Sequelize = require('sequelize');
const sequelize = new Sequelize("bowlinglog", "postgres", "password", {
    host: "localhost",
    dialect: "postgres"
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully to the database.');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });

module.exports = sequelize;
    