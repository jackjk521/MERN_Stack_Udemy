const { User } = require('./User.model')
const { Profile } = require('./Profile.model')
const { Experience } = require('./Experience.model')
const { Education } = require('./Education.model')
const { Post } = require('./Post.model')
const { Like } = require('./Like.model')
const { Comment } = require('./Comment.model')


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

    // Posts 
    Post.hasMany(Like, {
        foreignKey: 'post_id',
        sourceKey:'post_id'
    })

    Like.belongsTo(Post, {
        foreignKey: 'post_id',
        targetKey:'post_id'
    })
    
    Post.hasMany(Comment, {
        foreignKey: 'post_id',
        sourceKey:'post_id'
    })

    Comment.belongsTo(Post, {
        foreignKey: 'post_id',
        targetKey:'post_id'
    })

}
