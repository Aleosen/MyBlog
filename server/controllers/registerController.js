const {register} = require('../models/Register')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) =>{
    try {
        const {username, email, password} = req.body
        console.log(`username: ${username} email: ${email} password: ${password}`)
        const hashedPassword = bcrypt.hash(password, 10)
        const newPost = await register(username, email, hashedPassword)
        console.log(newPost)
        res.json({ success: true });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Username or email already exists' });
          }
        console.log('SQL ошибка: ', err)
        res.status(500).json({error:err.message})
    }
}

module.exports = {
    registerUser
}