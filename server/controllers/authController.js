require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.JWT_SECRET
const {authUser} = require('../models/Auth')

const userLogin = async (req, res) => {
    try {
        const {login, password, rememberMe} = req.body
        console.log(`login: ${login} password: ${password} rem: ${rememberMe}`)
        const user = await authUser(login)
        console.log(`user: ${user} `)
        if(!user.rows.length) return res.status(401).json({error:'Invalid credentials'})
        const userData = user.rows[0]
        const isValid = await bcrypt.compare(password, userData.password_hash)
        console.log(`is valid: ${isValid}`)
        if(!isValid) return res.status(401).json({error:'Invalid credentials'})
        const token = jwt.sign({ id: userData.id, username: userData.username }, secret, { expiresIn: rememberMe ? '7d' : '1h' });
        res.cookie('token', token, {
            httpOnly:true,
            sameSite:'Strict',
            secure:false,
            maxAge: rememberMe ? 604800000 : 3600000
        })
        res.json({ success:true, username:user.username});
    } catch (err) {
        console.log('SQL Error: ', err)
        res.status(500).json({error:err.message})
    }   
}

const userLogout = (req, res) => {
    res.clearCookie('token')
    res.json({success:true})
}


module.exports = {userLogin, userLogout}