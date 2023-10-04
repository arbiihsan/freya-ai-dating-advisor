const UserController = require('../controllers/userController')
const chatController = require('../controllers/chatController')
const userRoute = require('express').Router()


userRoute.post('/login', UserController.login)
userRoute.post('/register', UserController.register)
userRoute.post('/glogin', UserController.googleLogin)
userRoute.post('/generate-qr', chatController.generateQr)

module.exports = userRoute
