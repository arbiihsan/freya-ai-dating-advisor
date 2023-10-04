const { User } = require('../models')
const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class userController {
    static async register(req, res) {
        try {
            const { email, password, username } = req.body
            const data = await User.create({ email, password, username })

            res.status(201).json({
                id: data.id,
                email: data.email
            })
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
                res.status(400).json({
                    "message": err.errors[0].message
                })
            } else {
                console.log(err)
                res.status(500).json({
                    "message": "Internal server error"
                })
            }
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body

            if (!email) throw { name: 'Email is required' }
            if (!password) throw { name: 'Password is required' }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) throw { name: "InvalidLogin" }

            const validPassword = comparePassword(password, user.password)

            if (!validPassword) throw { name: 'InvalidLogin' }

            const access_token = signToken({
                id: user.id,
                email: user.email,
                user: user.id
            })

            // console.log(user, '<<<<di controller');

            res.status(200).json({
                access_token,
                username: user.username,
            })
        } catch (err) {
            if (err.name === 'Password is required' || err.name == 'Email is required') {
                res.status(400).json({
                    "message": err.name
                })
            } else if (err.name === 'InvalidLogin') {
                res.status(401).json({
                    "message": "Invalid email/password"
                })

            } else {
                console.log(err)
                res.status(500).json({
                    "message": "Internal server error"
                })
            }
        }
    }
    static async googleLogin(req, res, next) {
        try {
            let { google_token } = req.headers
            // console.log(google_token);

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "google-login",
                },
                hooks: false
            })

            const accessToken = signToken({
                id: user.id,
                email: user.email
            })
            // console.log(user.username);
            res.status(200).json({
                access_token: accessToken,
                username: user.username,
                id: user.id
            })
        } catch (err) {
            // console.log(err);
            next(err)
        }
    }
}

module.exports = userController