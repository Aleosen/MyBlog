const {userLogin, userLogout} = require('../controllers/authController')
const express = require('express')
const router = express.Router()
const {auth} = require('../middleware/Auth')


router.post('/login', userLogin)
router.post('/logout', userLogout)
router.get('/me', auth, (req, res)=>{
    res.json({
        success:true,
        user:req.user
    })
})

module.exports = router