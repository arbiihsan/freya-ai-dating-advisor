const chatController = require('../controllers/chatController')
const userRoute = require('express').Router()


userRoute.post('/fetch-answer', chatController.fetchAnswer)
userRoute.post('/fetch-pickup', chatController.fetchPickup)
userRoute.post('/generate-qr', chatController.generateQr)

module.exports = userRoute
