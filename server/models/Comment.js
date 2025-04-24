require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

const createComment = async(post_id, user_id, parent_comment_id, content) => {
    const query = `INSERT INTO comments (post_id, user_id, parent_comment_id, content)
    VALUES ($1, $2, $3, $4) returning *`
    const result = await pool.query(query, [post_id, user_id, parent_comment_id, content])
    return result.rows[0]
}

const getComments = async (post_id) => {
    const query = `SELECT `
}

module.exports = {
    createComment
}