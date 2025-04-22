require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

const addView = async(post_id, user_id) => {
    const query = `insert into views_users (post_id, user_id) values ($1, $2) ON CONFLICT (post_id, user_id) DO NOTHING returning *`
    const result = await pool.query(query, [post_id, user_id])
    if(result.rows.length>0){
        await pool.query(
            'UPDATE posts SET views_count = views_count + 1 WHERE id = $1;',
            [post_id]
          );
    }
}
module.exports = {
    addView
}