// get users armies
require('dotenv').config()
const db = require('../db')
const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/api/factions/psql', (req,res) => {
    return db.query('select * from factions;')
        .then(result=>result.rows).then(faction => res.status(200).json(faction))
})


router.get('/api/faction/units/pqsl/:factionId', (req,res) => {
    return db.query('select * from units WHERE faction_id = $1;', [req.params.factionId])
    .then(result=>result.rows).then(faction => res.status(200).json(faction))
})

router.post('/api/:saveArmy/:user_id/:faction_chosen_id/:subfaction_chosen/:army_name/:points/:user_army_array', (req,res) => {
    return User.saveArmy(req.params)
})

router.get('/api/getMyArmies/:user_id', (req,res) => {
    console.log('at api router')
    console.log(req.params.user_id)
    return User.getMyArmies(Number(req.params.user_id))
        .then(result=>result.rows).then(faction => res.status(200).json(faction)) // this returns what i want
})

module.exports = router