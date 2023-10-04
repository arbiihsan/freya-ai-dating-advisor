const router = require('express').Router()
const userRoutes = require('./user')
const chatRoutes = require('./chat')
const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

// const authentication = require('../middleware/authentication')


router.use(userRoutes)

router.use(async (req, res, next) => {
    try {
        const { access_token } = req.headers

        if (!access_token) throw { name: 'Unauthorized' }

        const verify = verifyToken(access_token)

        const userDb = await User.findByPk(verify.id)

        if (!userDb) throw { name: "Unauthorized" }

        req.user = userDb
        
        next()
    } catch (err) {
        if (err.name === 'Unauthorized' || err.name === 'JsonWebTokenError') {
            res.status(401).json({
                "message": "Invalid token"
            })
        } else {
            console.log(err)
            res.status(500).json({
                "message": "Internal server error"
            })
        }
    }
})

router.use(chatRoutes)



module.exports = router