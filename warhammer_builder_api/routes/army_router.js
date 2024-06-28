// get users armies
require('dotenv').config()
const db = require('../db')
const express = require('express')
const router = express.Router()

router.get('/api/factions/psql', (req,res) => {
    return db.query('select * from factions;')
        .then(result=>result.rows).then(faction => res.status(200).json(faction))
})


router.get('/api/faction/units/pqsl/:factionId', (req,res) => {
    return db.query('select * from units WHERE faction_id = $1;', [req.params.factionId])
    .then(result=>result.rows).then(faction => res.status(200).json(faction))
})

module.exports = router