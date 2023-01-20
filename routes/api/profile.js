const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const {Profile} = require('../../models/Profile.model')
const {check, validationResult} = require('express-validator')
const { User } = require('../../models/User.model')
const { Experience } = require('../../models/Experience.model')
const { Education } = require('../../models/Education.model')

//@route GET api/profile/me
// @desc Get current users profile
// @access Public

router.get('/me', auth , async(req, res) => {
    try {
        const profile = await Profile.findOne({
            where:{ user_id: req.user.id },
            include:[
                {
                    model: User,
                    // attributes: ["userName", "avatar"],  // to specify which attributes to be included
                    required: true,
                    include:[ Experience, Education ], // automatch with id
                }
            ],
        })
       
        if(!profile){
            return res.status(400).json({msg:'Profile doesn not exist'})
        }
         return res.json(profile) //works as of 1/20/23

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route POST api/profile
// @desc Create or update user profile
// @access Private}

router.post('/', [auth, [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills are required').not().isEmpty()
    ],
], async (req, res) => {
    const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
        }
        const {
            company,
            website, 
            location, 
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body

        try {
            let profile = await Profile.findOne({
                where:{ user_id: req.user.id },
                include:[
                    {
                        model: User,
                        required: true,
                        include:[Experience, Education]
                    }
                ]
            })

            if(profile){
                profile = await Profile.update(
                        {
                            company: company,
                            website: website,
                            location: location,
                            bio: bio,
                            status: status,
                            githubusername: githubusername,
                            skills: skills,
                            youtube: youtube,
                            facebook: facebook,
                            twitter: twitter,
                            instagram: instagram,
                            linkedin: linkedin,
                        },
                        {
                            where: {user_id : req.user.id},
                        }
                  )     
                    return res.json(await Profile.findOne({ where:{ user_id: req.user.id}})) // testing purposes
            }
            else {
                profile = await Profile.create({
                    user_id: req.user.id,
                    company: company,
                    website: website,
                    location: location,
                    bio: bio,
                    status: status,
                    githubusername: githubusername,
                    skills: skills,
                    youtube: youtube,
                    facebook: facebook,
                    twitter: twitter,
                    instagram: instagram,
                    linkedin: linkedin,
                  });

                await profile.save()
            }
        } catch (err) { 
            console.error(err.message)
            res.status(500).send('Server Error')
        }
})

//@route GET api/profile
// @desc Get all profiles
// @access Public

router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.findAll({
            include:[
                {
                    model: User,
                    attributes:['userName', 'avatar']
                }
            ]
        })
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


//@route GET api/profile/user/:user_id
// @desc Get a specific profile user_id
// @access Public

router.get('/user/:user_id', async(req, res) => {
    try {
        const profile = await Profile.findOne({
            where:{ user_id: req.params.user_id },
            include:[
                {
                    model: User,
                    attributes:['userName', 'avatar']
                }
            ]
        })

        if(!profile){
            return res.status(400).json({msg:'Profile not found'})
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')

        if(err.kind  == 'ObjectId' ) {
            return res.status(400).json({msg: 'Profile not found' })
        }
    }
})

//@route DELETE api/profile/
// @desc Delete a profile, user, posts
// @access Private

router.delete('/', auth,  async(req, res) => {
    try {
        // Remove profile and user
        await Profile.destroy({
            where: { user_id: req.user.id },
          });
        await User.destroy( {
            where:{ id: req.user.id }
        })

        res.json('User and profile deleted')

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')

        if(err.kind  == 'ObjectId' ) {
            return res.status(400).json({msg: 'Profile not found' })
        }
    }
})

//@route PUT api/profile/experience
// @desc Add profile experience
// @access Private

router.put('/experience', [auth, 
        check ('title', 'Title is required').not().isEmpty(),
        check ('company', 'Company is required').not().isEmpty(),
        check ('from', 'From date is required').not().isEmpty(),
    ],  async(req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
        }

        const {
            title,
            company,
            location, 
            from , 
            to, 
            current, 
            description
        } = req.body

        const newExp = {
            user_id: req.user.id,
            title,
            company,
            location, 
            from , 
            to, 
            current, 
            description
        }

        try {
            const profile = await Profile.findOne({
                include:[
                    {
                        model: User,
                        required: true,
                    }
                ],
                where: { user_id: req.user.id},
            })

            if(profile){
                const exp = await Experience.create(newExp)
                await exp.save()

                const allExp = await Experience.findAll({
                    where: { user_id: req.user.id}
                })
                return res.json(allExp) // to view all the experiences of the user (testing purposes)
            }
    
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    
})

// @route DELETE api/profile/experience/:exp_id
// @desc Delete profile experience
// @access Private

router.delete('/experience/:exp_id', auth, async(req, res) => {
    try {
        
        // const removeIdx = profile.user.experiences.findIndex(item => item.exp_id == req.params.exp_id ) // get the index from an object

        // Remove specific experience
        await Experience.destroy({  
            where: { 
                user_id: req.user.id,
                exp_id: req.params.exp_id
            },
          });
        res.json('Experience deleted')

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')

        if(err.kind  == 'ObjectId' ) {
            return res.status(400).json({msg: 'Experience not found' })
        }
    }
})

// @route PUT api/profile/education
// @desc Add profile education
// @access Private

router.put('/education', [auth, 
    check ('school', 'School is required').not().isEmpty(),
    check ('degree', 'Degree is required').not().isEmpty(),
    check ('fieldofstudy', 'Field of Study is required').not().isEmpty(),
],  async(req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    const {
       school,
       degree,
       fieldofstudy,
       from,
       to,
       current,
       description
    } = req.body

    const newEdu = {
        user_id: req.user.id,
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({
            include:[
                {
                    model: User,
                    required: true,
                }
            ],
            where: { user_id: req.user.id},
        })

        if(profile){
            const edu = await Education.create(newEdu)
            await edu.save()

            const allEdu = await Education.findAll({
                where: { user_id: req.user.id}
            })
            return res.json(allEdu) // to view all the experiences of the user (testing purposes)
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }

})

// @route DELETE api/profile/education/:edu_id
// @desc Delete profile experience
// @access Private

router.delete('/education/:edu_id', auth, async(req, res) => {
try {
    
    // Remove specific education
    await Education.destroy({  
        where: { 
            user_id: req.user.id,
            edu_id: req.params.edu_id
        },
      });
    res.json('Educational background deleted')

} catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')

    if(err.kind  == 'ObjectId' ) {
        return res.status(400).json({msg: 'Educational background not found' })
    }
}
})

module.exports = router;
