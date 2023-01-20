const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/mysqlDb');
  
const Experience = db.define('experiences', {
    exp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    company:{
        type: DataTypes.STRING,
        allowNull: false
    },
    location:{
        type: DataTypes.STRING,
    },
    from:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    to:{
        type: DataTypes.DATE,
    },
    current:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    description: {
        type: DataTypes.STRING,
    },
})

Experience.sync({ alter: true });
module.exports =  { Experience }
