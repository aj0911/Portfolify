const express = require('express')
const { register, getUser, login, sendOTP, updatePassword } = require('../Controllers/UserController')

const router = express.Router()

router.post('/register',register).get('/getUser/:id',getUser).post('/login',login).post('/reset',sendOTP).put('/forgot/:otp',updatePassword)

module.exports = router;