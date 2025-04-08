const {registerUser} = require('../controllers/registerController')
const {auth} = require('../middleware/Auth')
const express = require('express')
const router = express.Router()

router.post('/', registerUser)

module.exports = router