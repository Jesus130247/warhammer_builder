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

function saveArmy({user_id, faction_chosen_id, subfaction_chosen, army_name, points, user_army_array}) {
    user_army_array = user_army_array.split(',')
    let sql = `
    INSERT INTO army
    (user_id, faction_chosen_id, subfaction_chosen, army_name, points, user_army_array)
    Values ($1, $2, $3, $4, $5, $6) 
    RETURNING *;`
    return db.query(sql, [user_id, faction_chosen_id, subfaction_chosen, army_name, points, user_army_array])
}

function getMyArmies(user_id) {
    let sql = `
    SELECT * FROM army
    where user_id = $1;`
    return db.query(sql, [user_id])
}

const User = {
    findByEmail,
    createUser,
    saveArmy,
    getMyArmies
}

module.exports = User