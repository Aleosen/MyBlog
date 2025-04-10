require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Authorization required' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            const message = err.name === 'TokenExpiredError' 
                ? 'Token expired' 
                : 'Invalid token';
            return res.status(401).json({ message });
        }

        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Malformed token' });
        }

        req.user = {
            id: decoded.id,
            username: decoded.username
        };

        console.log('Authenticated user:', req.user); 
        next();
    });
};

module.exports = { auth };