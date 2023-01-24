const { User } = require('./User.model')
const { Profile } = require('./Profile.model')
const { Experience } = require('./Experience.model')
const { Education } = require('./Education.model')


module.exports = () => {
    
    // Profile 
    User.hasOne(Profile, {
        foreignKey: 'user_id',
        sourceKey:'id'
    })
    Profile.belongsTo(User, { 
        foreignKey:'user_id',  
        targetKey: 'id'
    })

    // Experience and Education
    User.hasMany(Experience, {
        foreignKey:'user_id', // experience
        sourceKey:'id' // user
    })
    Experience.belongsTo(User, { 
        foreignKey:'user_id', // experience
        targetKey: 'id' // user
    })

    User.hasMany(Education, {
        foreignKey: 'user_id',
        sourceKey:'id'
    })
    Education.belongsTo(User, {
        foreignKey:'user_id',
        targetKey: 'id'
    })

}
