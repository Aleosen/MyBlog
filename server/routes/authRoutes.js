const {userLogin} = require('../controllers/authController')
const express = require('express')
const router = express.Router()

router.post('/', userLogin)

module.exports = router