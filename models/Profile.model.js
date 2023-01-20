const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/mysqlDb');
  
const Profile = db.define('profiles', {
    prof_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    company:{
        type: DataTypes.STRING,
    },
    website:{
        type: DataTypes.STRING,
    },
    location:{
        type: DataTypes.STRING,
    },
    bio:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    githubusername:{
        type: DataTypes.STRING
    },
    skills:{ // cant have an array so need to change
        type: DataTypes.STRING, // array (only for postgres none for mysql)
        allowNull: false
    },
    youtube:{
        type: DataTypes.STRING,
    },
    twitter:{
        type: DataTypes.STRING,
    },
    facebook:{
        type: DataTypes.STRING,
    },
    linkedin:{
        type: DataTypes.STRING,
    },
    instagram:{
        type: DataTypes.STRING,
    },
    date:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

Profile.sync({ alter: true });

module.exports = { Profile }