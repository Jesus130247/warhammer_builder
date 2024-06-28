const pg = require('pg')
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

module.exports = pool