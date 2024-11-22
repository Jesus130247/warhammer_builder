require('dotenv').config()

const bcrypt = require('bcrypt')
const db = require('./index.js')
const email = 'dt@ga.co'
const plainTextPassword = 'pudding'
const saltRounds = 10;

const sql = `INSERT INTO warhammer_users
(email, password_disgest)
VALUES ( $1, $2) RETURNING *`

async function createDummyUser() {
    try {
        let salt = await bcrypt.genSalt(saltRounds)
        let hash = await bcrypt.hash(plainTextPassword, salt)
        let result = await db.query(sql, [email, hash])
        console.log(result.rows);
    } catch(err) {
        console.log(err)
    }
}

// createDummyUser()