require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.JWT_SECRET
const {authUser} = require('../models/Auth')

const userLogin = async (req, res) => {
    try {
        const {login, password} = req.body
        console.log(`login: ${login}password: ${password}`)
        const user = await authUser(login)
        if(!user) return res.status(401).json({error:'Invalid credentials'})
        const isValid = bcrypt.compare(password, user.password)
        if(!isValid) return res.status(401).json({error:'Invalid credentials'})
        const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly:true,
            sameSite:'Strict',
            secure:false,
            maxAge:60 * 60 * 24 * 7 * 1000
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