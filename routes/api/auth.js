const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
// const User = require('../../models/UserMongo')
const {User} = require('../../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

//@route GET api/auth
// @desc Test route
// @access Public

router.get('/', auth, async(req, res) => {
    try { // don't use findByPk ( so that we can use a exclude method )
        const user = await User.findOne({where: {id : req.user.id}, attributes: {exclude: ['password']}})
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

//@route POST api/auth
// @desc Authenticate and get token
// @access Public
router.post(
    '/', 
    [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    ], async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
        }

        const { email, password } = req.body
        try {
            let user = await User.findOne({where: {email: email}})
            // See if the user exists
            if(!user){
                return res.status(400).json({ errors: [{msg: 'Invalid credentials'}]})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return res.status(400).json({error: [{msg:'Invalid credentials'}]})
            }

            const payload = {
                user:{
                    id: user.id // no need to be _id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), 
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
