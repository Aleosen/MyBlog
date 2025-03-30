const {getPost, getPosts, createPost, deletePost, updatePost} = require('../controllers/postsController')
const express = require('express')
const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', createPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

module.exports = router