const {createComment} = require('../models/Comment')

const sendComment = async(req, res) => {
    try {
        const {parent_id, content} = req.body
        const post_id = req.params.id
        const user_id = req.user.id
        const result = await createComment(post_id, user_id, parent_id, content)
        console.log(result)
        res.json(result)
    } catch (err) {
        console.error('Ошибка SQL:', err); 
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    sendComment
}