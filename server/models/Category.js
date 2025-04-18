require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

const getAllCategories = async (term) =>{
    const query = 'SELECT * from categories where name ILIKE $1 order by name;'
    const result = await pool.query(query, [`%${term}%`])
    return result
}

module.exports = {
    getAllCategories
}