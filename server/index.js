require('dotenv').config()
const cors = require('cors')
const express = require('express')
const {Pool} = require('pg')
const app = express()
const cookieParser = require('cookie-parser');

const postRoutes = require('./routes/postsRoutes')
const registerRoutes = require('./routes/registerRoutes')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const profileRoutes = require('./routes/profileRoutes')

app.use(cors({origin: 'http://localhost:5173', credentials: true, methods: ['POST', 'GET', 'PUT'],
    exposedHeaders: ['Set-Cookie'],
    allowedHeaders: ['Content-Type', 'Authorization']}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cookieParser());
const pool = new Pool({connectionString:process.env.DATABASE_URL})

pool.query('SELECT now()', (err)=>{
    if(err){console.log('Database error: ' + err)}
    else {
        console.log('Database connected')
    }
})

app.use('/api/blogs', postRoutes)
app.use('/api/register', registerRoutes)
app.use('/api', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/profile', profileRoutes)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server running on ${port} port`)
})