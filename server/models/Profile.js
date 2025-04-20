require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

const getProfileData = async (id) => {
    const query = 'SELECT username, description, created_at from users where id = $1'
    const result = await pool.query(query, [id])
    return result.rows[0]
}

const getPostByUserId = async (id) => {
    const query = `SELECT 
        posts.id as post_id,
        posts.content, 
        posts.created_at, 
        posts.title, 
        posts.media_url, 
        posts.likes_count, 
        posts.views_count,
        users.id as user_id, 
        users.username, 
        array_agg(json_build_object(
            'id', categories.id,
            'name', categories.name,
            'description', categories.description,
            'color', categories.color
        )) as categories
        from posts 
        inner join users on posts.user_id = users.id 
        left join post_categories on posts.id = post_categories.post_id 
        left join categories on post_categories.category_id = categories.id
        where users.id = $1 
        GROUP BY posts.id, users.id LIMIT 5`
    const result = await pool.query(query, [id])
    return result.rows
}

module.exports = {
    getProfileData, getPostByUserId
}