const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/mysqlDb');
  
const Comment = db.define('comments', {
    comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    post_id:{
        type: DataTypes.INTEGER,
        allowNull: false
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

Comment.sync({ alter: true });

module.exports = { Comment }