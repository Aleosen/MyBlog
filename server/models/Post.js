require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

const getAllPosts = async (page, limit) => {
    const offset = (page - 1) * limit
    const query = 'select posts.id as post_id, '+
            'posts.content, posts.created_at, posts.title, posts.media_url, posts.likes_count, posts.views_count, ' +
            'users.id as user_id, users.username from posts inner join users on posts.user_id = users.id'+ 
            ' ORDER BY posts.created_at DESC LIMIT $1 OFFSET $2'
    const result = await pool.query(query, [limit, offset])
    return result.rows
}

const getPostById = async (id) => {
    const query = 'SELECT posts.id as post_id, '+
        'posts.content, posts.created_at, posts.title, posts.media_url, posts.likes_count, posts.views_count, ' +
        'users.id as user_id, users.username from posts inner join users on posts.user_id = users.id where posts.id = $1'
    const result = await pool.query(query, [id])
    return result.rows[0]
}
const createNewPost = async (title, content, media_url) => {
    const query = 'insert into posts(user_id, title, content, media_url) values ($1, $2, $3, $4) returning *'
    const result = await pool.query(query, [1, title, content, media_url])
    return result.rows[0]
}
const deletePostById = async (id) => {
    const query = 'delete from posts where id = $1'
    await pool.query(query, [id])
}

const updatePostById = async (id, title, content, media_url) => {
    const query = 'update posts set title = $1, content = $2, media_url = $3 where id = $4 RETURNING *'
    const result = await pool.query(query, [title, content, media_url, id])
    return result.rows[0]
}

module.exports = {
    getPostById, getAllPosts, createNewPost, deletePostById, updatePostById
}