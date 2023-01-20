const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/mysqlDb');
  
const Like = db.define('likes', {
    like_id: {
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
})

Like.sync({ alter: true });

module.exports = { Like }