const express = require('express')
const route = express.Router()
const {auth} = require('../middleware/userAuth')

const {register, login, getUser} = require('../controller/userController')

route.post('/register', register)
route.post('/login', login)
route.get('/getUser', auth, getUser)

module.exports = route