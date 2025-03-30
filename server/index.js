require('dotenv').config()
const cors = require('cors')
const express = require('express')
const {Pool} = require('pg')
const postRoutes = require('./routes/postsRoutes')
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

app.use('/api/blogs', postRoutes)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server running on ${port} port`)
})