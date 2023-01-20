const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/mysqlDb');
  
const Post = db.define('posts', {
    post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text:{
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
    },
    avatar:{
        type: DataTypes.STRING,
    },
    date:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

Post.sync({ alter: true });

module.exports = { Post }