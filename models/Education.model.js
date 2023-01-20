const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../config/mysqlDb');
  
const Education = db.define('education', {
    edu_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    school:{
        type: DataTypes.STRING,
        allowNull: false
    },
    degree:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fieldofstudy:{
        type: DataTypes.STRING,
        allowNull: false
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
    }
})

Education.sync({ alter:true })
module.exports =  { Education }
