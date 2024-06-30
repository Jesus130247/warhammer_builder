const db = require('../db')

function createUser(email, hash) {
        let sql = `
        INSERT INTO users
        (email, password_disgest) 
        VALUES ($1, $2)
        RETURNING *;
        `
        return db.query(sql, [email, hash])
        .then(res=>res.rows)
}

function findByEmail(email) {
    let sql = `
    SELECT * FROM users WHERE email = $1;
    `
    return db.query(sql, [email])
            .then(result => {
                if(result.rowCount ===0) {
                    let err = new Error('resource not found')
                    err.status = 400
                    throw err
                }
                return result.rows[0]
            })
}

const User = {
    findByEmail,
    createUser
}

module.exports = User