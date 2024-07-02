const pg = require('pg')
require('dotenv').config()
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

module.exports = pool