const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/mysqlDb');
  
// console.log(db)
const User = db.define('users', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar:{
        type: DataTypes.STRING,
    },
    date:{
        type: DataTypes.DATE,  
        defaultValue: DataTypes.NOW
    },
  });

User.sync({ alter: true });

module.exports = { User }