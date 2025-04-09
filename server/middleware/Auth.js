require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const auth = (req, res, next) => {

    const token = req.cookies.token
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            const message = err.name === 'TokenExpiredError'
                ? 'Token expired' : 'Invalid token';
            return res.status(401).json({ message });
        }

        req.user = decoded;
        next();
    });
}

module.exports = {
    auth
}