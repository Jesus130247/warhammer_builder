const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Ensure this is set to your PostgreSQL connection string
    ssl: {
        rejectUnauthorized: false // Optional: this bypasses SSL certificate validation (not recommended for production)
    }
});

module.exports = pool;
