const {getProfile, getUserPosts} = require('../controllers/profileController')
const express = require('express')
const router = express.Router()

router.get('/:id', getProfile)
router.get('/:id/posts', getUserPosts)
module.exports = router