const {getProfileData, getPostByUserId} = require('../models/Profile')

const getProfile = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const user = await getProfileData(id)
        res.json(user)
    } catch (error) {
        console.error('Database error:', error)
        res.status(500).json({err:error.message})
    }
}

const getUserPosts = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const posts = await getPostByUserId(id)
        res.json(posts)
    } catch (error) {
        console.error('Database error:', error)
        res.status(500).json({err:error.message})
    }
}

module.exports = {getProfile, getUserPosts}