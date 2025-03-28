require('dotenv').config()
const cors = require('cors')
const express = require('express')
const {Pool} = require('pg')

const app = express()
app.use(cors({origin: 'http://localhost:5173', methods: ['POST', 'GET', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const pool = new Pool({connectionString:process.env.DATABASE_URL})

pool.query('SELECT now()', (err)=>{
    if(err){console.log('Database error: ' + err)}
    else {
        console.log('Database connected')
    }
})

app.get('/api/data', async (req, res)=>{
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const result = await pool.query('select posts.id as post_id, '+
            'posts.content, posts.created_at, posts.title, posts.media_url, posts.likes_count, posts.views_count, ' +
            'users.id as user_id, users.username from posts inner join users on posts.user_id = users.id'+ 
            ' ORDER BY posts.created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);
        res.json(result.rows)
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({err:error.message})
    }
})

app.post('/api/items', async(req, res)=> {
    const {title, content, media_url} = req.body
    console.log(`Получены данные title:${title}, content: ${content}, media_url:${media_url}` )
    try {
        const result = await pool.query('insert into posts(user_id, title, content, media_url) values ($1, $2, $3, $4) returning *',
             [1, title, content, media_url])
        console.log('Результат запроса: '+result.rows)
        res.json(result.rows[0])
    } catch (err) {
        console.error('Ошибка SQL:', err); 
        res.status(500).json({ error: err.message });
      }
})

app.delete('/api/items/:id', async(req, res)=>{
    try {
        const {id} = req.params
        console.log(`Получены данные title:${id}` )
        await pool.query('delete from posts where id = $1', [id])
        res.status(204).end()
    } catch (error) {
        console.log('Delete error: ', error)
        res.status(500).json({error:error.message})
    }
})

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server running on ${port} port`)
})