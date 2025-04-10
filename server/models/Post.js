require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

const getAllPosts = async (search, limit, sort, offset) => {
    
    let orderBy
    if(search) {
        orderBy = `
      ts_rank(
        to_tsvector('russian', posts.title || ' ' || posts.content), 
        to_tsquery('russian', $1)
      ) DESC
    `
    }

    switch(sort){
        case 'time':
            orderBy=`posts.created_at DESC`
            break;
        case 'popularity':
            orderBy=`posts.views_count DESC`
            break;
        default:
            orderBy=`posts.created_at DESC`
    }

    const query = `SELECT 
                        posts.id AS post_id,
                        posts.content, 
                        posts.created_at, 
                        posts.title, 
                        posts.media_url, 
                        posts.likes_count, 
                        posts.views_count,
                        users.id AS user_id, 
                        users.username,
                        COUNT(*) OVER() AS total_count
                    FROM 
                        posts 
                    INNER JOIN 
                        users ON posts.user_id = users.id
                    WHERE
                        ($1::text IS NULL OR 
                        to_tsvector('russian', posts.title || ' ' || posts.content) @@ to_tsquery('russian', $1))
                    ORDER BY
                        ${orderBy}
                    LIMIT $2 OFFSET $3;`
    const result = await pool.query(query, [search, limit, offset])
    return result.rows
}

const countAllPosts = async () => {
    const query = 'select COUNT(*) AS total_count from posts'
    const result = await pool.query(query)
    return parseInt(result.rows[0].total_count)
}

const getPostById = async (id) => {
    const query = 'SELECT posts.id as post_id, '+
        'posts.content, posts.created_at, posts.title, posts.media_url, posts.likes_count, posts.views_count, ' +
        'users.id as user_id, users.username from posts inner join users on posts.user_id = users.id where posts.id = $1'
    const result = await pool.query(query, [id])
    return result.rows[0]
}

const createNewPost = async (title, author_id, content, media_url) => {
    const query = 'insert into posts(user_id, title, content, media_url) values ($1, $2, $3, $4) returning *'
    const result = await pool.query(query, [author_id, title, content, media_url])
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
    getPostById, getAllPosts, createNewPost, deletePostById, updatePostById, countAllPosts
}