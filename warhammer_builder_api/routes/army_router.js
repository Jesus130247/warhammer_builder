// get users armies
require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../db')
const User = require('../models/User')

router.get('/api/factions/psql', (req,res) => {
    return db.query('select * from factions;')
        .then(result=>result.rows).then(faction => res.status(200).json(faction))
})


router.get('/api/faction/units/pqsl/:factionId', (req,res) => {
    return db.query('select * from units WHERE faction_id = $1;', [req.params.factionId])
    .then(result=>result.rows).then(faction => res.status(200).json(faction))
})

router.post('/api/saveArmy/:user_id/:faction_chosen_id/:subfaction_chosen/:army_name/:points/:pointLimit/:user_army_array', (req,res) => {
    return User.saveArmy(req.params)
})

router.get('/api/getMyArmies/:user_id', (req,res) => {
    return User.getMyArmies(Number(req.params.user_id))
        .then(result=>result.rows).then(faction => res.status(200).json(faction)) // this returns what i want
})

router.delete('/api/delete/army/:armyId', (req,res) => {
    console.log(req.params.armyId)
    User.deleteArmy(req.params.armyId).then(result=>result.rows).then(faction => res.status(200).json(faction))
})

router.get('/api/user/:email', (req,res) => {
    let sql = `
    SELECT * FROM users
    WHERE email = $1;
    `
    return db.query(sql, [req.params.email]).then(result=>result.rows).then(user => res.status(200).json(user))
})


module.exports = router