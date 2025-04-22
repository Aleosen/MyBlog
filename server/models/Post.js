require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

const getAllPosts = async (search, limit, filter, offset) => {
    let orderBy;
    let whereDate = '';
    let whereCategories = '';
    let params = []; // сюда будут складываться параметры
    let paramIndex = 1; // чтобы динамически подставлять $1, $2, ...

    // === Search ===
    let searchCondition = 'TRUE';
    if (search) {
        searchCondition = `to_tsvector('russian', posts.title || ' ' || posts.content) @@ to_tsquery('russian', $${paramIndex})`;
        params.push(search);
        paramIndex++;
    }

    // === Date Filter ===
    switch(filter.date) {
        case 'Last day':
            whereDate = `AND posts.created_at >= CURRENT_DATE - INTERVAL '1 day'`;
            break;
        case 'Last week':
            whereDate = `AND posts.created_at >= CURRENT_DATE - INTERVAL '1 week'`;
            break;
        case 'Last month':
            whereDate = `AND posts.created_at >= CURRENT_DATE - INTERVAL '1 month'`;
            break;
        case 'Last year':
            whereDate = `AND posts.created_at >= CURRENT_DATE - INTERVAL '1 year'`;
            break;
    }

    // === Category Filter ===
    const categoryIds = filter.categories?.map(item => item.id);
    if (categoryIds?.length > 0) {
        whereCategories = `AND EXISTS (
            SELECT 1 FROM post_categories pc
            WHERE pc.post_id = posts.id AND pc.category_id = ANY($${paramIndex})
        )`;
        params.push(categoryIds);
        paramIndex++;
    }

    // === Sorting ===
    switch(filter.sort){
        case 'Newest':
            orderBy = `posts.created_at DESC`;
            break;
        case 'Hot':
            orderBy = `posts.views_count DESC`;
            break;
        default:
            orderBy = `posts.created_at DESC`;
    }

    // === Limit and Offset ===
    params.push(limit);      // $paramIndex++
    params.push(offset);     // $paramIndex++

    const query = `
        SELECT 
            posts.id AS post_id,
            posts.content, 
            posts.created_at, 
            posts.title, 
            posts.media_url, 
            posts.likes_count, 
            posts.views_count,
            users.id AS user_id, 
            users.username,
            users.media_url as avatar_url,
            array_agg(
                json_build_object(
                    'id', categories.id,
                    'name', categories.name,
                    'color', categories.color
                )
            ) AS categories,
            COUNT(*) OVER() AS total_count
        FROM 
            posts 
        INNER JOIN 
            users ON posts.user_id = users.id
        LEFT JOIN
            post_categories ON posts.id = post_categories.post_id
        LEFT JOIN
            categories ON post_categories.category_id = categories.id
        WHERE
            ${searchCondition}
            ${whereDate}
            ${whereCategories}
        GROUP BY
            posts.id, users.id
        ORDER BY
            ${orderBy}
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1};
    `;

    const result = await pool.query(query, params);
    return result.rows;
};

const countAllPosts = async () => {
    const query = 'select COUNT(*) AS total_count from posts'
    const result = await pool.query(query)
    return parseInt(result.rows[0].total_count)
}

const getPostById = async (id) => {
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
        where posts.id = $1 
        GROUP BY posts.id, users.id`
    const result = await pool.query(query, [id])
    return result.rows[0]
}

const createNewPost = async (title, author_id, content, media_url, categories) => {
    const postQuery = 'insert into posts(user_id, title, content, media_url) values ($1, $2, $3, $4) returning *'
    const result = await pool.query(postQuery, [author_id, title, content, media_url])
    const categoryQuery = 'insert into post_categories(post_id, category_id) values ($1, $2)'
    for (const category of categories) {
        console.log(`Post id: ${result.rows[0].id} Category id: ${category.id}`)
        await pool.query(categoryQuery, [result.rows[0].id, category.id])
    }
    return result.rows[0]
}

const deletePostById = async (id) => {
    const queryPostCat = 'delete from post_categories where post_id = $1'
    const queryPost = 'delete from posts where id = $1'
    await pool.query(queryPostCat, [id])
    await pool.query(queryPost, [id])
}

const updatePostById = async (id, title, content, media_url, categories) => {
    const postQuery = 'update posts set title = $1, content = $2, media_url = $3 where id = $4 RETURNING *'
    const deleteQuery = 'delete from post_categories where post_id = $1'
    const categoryQuery = 'insert into post_categories(post_id, category_id) values ($1, $2)'
    const result = await pool.query(postQuery, [title, content, media_url, id])
    await pool.query(deleteQuery, [id])
    for (const category of categories) {
        console.log(`Post id: ${id} Category id: ${category.id}`)
        await pool.query(categoryQuery, [id, category.id])
    }
    return result.rows[0]
}

module.exports = {
    getPostById, getAllPosts, createNewPost, deletePostById, updatePostById, countAllPosts
}