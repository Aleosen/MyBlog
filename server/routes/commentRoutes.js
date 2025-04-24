const {sendComment} = require('../controllers/commentController')
const {auth} = require('../middleware/Auth')
const express = require('express')
const router = express.Router({ mergeParams: true })

router.post('/', auth, sendComment)

module.exports = router