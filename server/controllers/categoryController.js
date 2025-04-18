const {getAllCategories} = require('../models/Category')

const getCategories = async(req, res) =>{
    try {
        const term = req.query.search || ''
        console.log(term)
        const result = await getAllCategories(term)
        res.json(result.rows)
    } catch (error) {
        console.log('Database error: ', error)
        res.status(500).status({err:error.message})
    }
}

module.exports = {
    getCategories
}