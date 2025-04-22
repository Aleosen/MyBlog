const {view} = require('../controllers/viewController')
const express = require('express')
const router = express.Router({ mergeParams: true })
const {auth} = require('../middleware/Auth')

router.post('/', auth, view)

module.exports = router