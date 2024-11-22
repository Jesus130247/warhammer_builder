const db = require('../db')

function createUser(email, hash) {
        let sql = `
        INSERT INTO warhammer_users
        (email, password_disgest) 
        VALUES ($1, $2)
        RETURNING *;
        `
        return db.query(sql, [email, hash])
        .then(res=>res.rows)
}

function findByEmail(email) {
    let sql = `
    SELECT * FROM warhammer_users WHERE email = $1;
    `
    return db.query(sql, [email])
            .then(result => {
                if(result.rowCount === 0) {
                    let err = new Error('resource not found')
                    err.status = 400
                    throw err
                }
                return result.rows[0]
            })
}


function saveArmy({user_id, faction_chosen_id, subfaction_chosen, army_name, points, pointLimit, colour, user_army_array}) {
    let sql = `
    INSERT INTO warhammer_army
    (user_id, faction_chosen_id, subfaction_chosen, army_name, points, pointLimit, colour, user_army_array)
    Values ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *;`
    return db.query(sql, [user_id, faction_chosen_id, subfaction_chosen, army_name, points, pointLimit, colour, user_army_array])
}

function updateArmy({army_id, faction_chosen_id, subfaction_chosen, army_name, points, pointLimit, colour, user_army_array}) {
    let sql = `
    UPDATE warhammer_army SET 
    faction_chosen_id = $2, 
    subfaction_chosen = $3,  
    army_name = $4, 
    points = $5, 
    pointLimit = $6, 
    colour = $7, 
    user_army_array = $8
    WHERE id = $1
    RETURNING *;
    `
    return db.query(sql, [army_id, faction_chosen_id, subfaction_chosen, army_name, points, pointLimit, colour, user_army_array])

}


function getMyArmies(userId) {
    let sql = `
    SELECT * FROM warhammer_army
    where user_id = $1;`
    return db.query(sql, [userId])
}

function deleteArmy(armyId) {
    sql = `
    DELETE FROM warhammer_army
    WHERE id=$1;
    `
    return db.query(sql, [armyId])
}

const User = {
    findByEmail,
    createUser,
    saveArmy,
    getMyArmies,
    deleteArmy,
    updateArmy
}

module.exports = User