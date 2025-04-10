require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

const authUser = async(login) =>{
    const query = `SELECT * from users where username = $1 or email = $1`
    const result = await pool.query(query, [login])
    return result
}

module.exports = {authUser}