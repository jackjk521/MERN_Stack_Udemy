const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const {User} = require('../../models/User.model')

// const User = require('../../models/User')
// const config = require('config')

//@route POST api/users
// @desc Register user
// @access Public 

router.post( '/', 
    [
    check('userName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password a password with 6 or more characters').isLength({min:6})

    ], async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
        }

        const { userName, email, password } = req.body

        try {
            // Can be improved with findOrCreate 
            let user = await User.findOne({ where: { email: email} })
            // See if the user exists
            if(user){
                return res.status(400).json({ errors: [{msg: 'User already exists'}]})
            }
        
            // Get users gravatar 
            const avatar = gravatar.url({
                s: "200", //size
                r: 'pg', // rating (no nude),
                d: "mm" //default pic
            })

             user =  new User({
                userName: userName,
                email: email,
                avatar: avatar,
                password: password
            })
            console.log(req.body)
            // Ecrypt password
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save() //error here
            console.log("works here 2")

            // return jsonwebtoken
            const payload = {
                user:{
                    id: user.id // no need to be _id
                }
            }

            jwt.sign(payload, process.env._JwtSecret, 
                {expiresIn: 3600},
                (err, token) => {
                    if(err) throw err
                    res.json({token})
                })  
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
})

module.exports = router;
