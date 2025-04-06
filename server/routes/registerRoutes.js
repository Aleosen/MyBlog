const {registerUser} = require('../controllers/registerController')
const express = require('express')
const router = express.Router()

router.post('/', registerUser)

module.exports = router