const {addView} = require('../models/View')

const view = async (req, res) => {
    try {
        console.log(req.params.id)
        const post_id = req.params.id
        const user_id = req.user.id
        await addView(post_id, user_id)
        res.status(200).json({ success: true })
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({err:error.message})
    }
}

module.exports = {view}