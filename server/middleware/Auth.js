require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({message:'Unauthoried'})
    }

    const token = authHeader.split(' ')

    try {
        const decoded = jwt.verify(token, secret, (err, user) => {
            if(err) return res.sendStatus(401)
            req.user = user
            next()
        })
        req.user = decoded
        next()
    } catch (err) {
        const message = err.name === 'TokenExpiredError'
        ? 'Token expired' : 'Invalid token'
        return res.status(401).json({message})
    }
}

module.exports = {
    auth
}