const express = require('express')
const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router()
const control = require('./../controllers/userController')


router.post('/register',control.registerUser)

router.post('/login',control.loginUser)

router.get('/current',validateToken,control.currentUser)



module.exports = router