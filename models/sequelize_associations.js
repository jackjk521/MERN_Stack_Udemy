const { User } = require('./User.model')
const { Profile } = require('./Profile.model')
const { Experience } = require('./Experience.model')
const { Education } = require('./Education.model')


module.exports = () => {
    
    // Profile 
    Profile.hasOne(User, {
        foreignKey: 'id',
        sourceKey:'user_id'
    })
    User.belongsTo(Profile, { // is this a need?
        foreignKey:'id'  
    })

    // Experience and Education
    User.hasMany(Experience, {
        foreignKey:'user_id',
        sourceKey:'id'
    })
    Experience.belongsTo(User, {
        foreignKey:'user_id'
    })

    User.hasMany(Education, {
        foreignKey: 'user_id',
        sourceKey:'id'
    })
    Education.belongsTo(User, {
        foreignKey:'user_id',
    })

}
