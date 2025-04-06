require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({connectionString:process.env.DATABASE_URL})

const register = async(username, email, password) => {
    const query = `INSERT INTO USERS (username, email, password) values ($1, $2, $3) returning *`

    const result = await pool.query(query, [username, email, password])
    return result.rows[0]
}

const findUsers = async(username, email)  => {
    const query = `SELECT * FROM users where username = $1 or email = $2`
    const result = await pool.query(query, [username, email])
    return result
}

module.exports = {
    register, findUsers
}