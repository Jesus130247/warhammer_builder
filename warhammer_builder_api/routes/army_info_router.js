// information on armies
require('dotenv').config()
const db = require('../db')
const express = require('express')
const router = express.Router()
const FactionInfo = require('../models/factions.js')

router.get('/api/factions', (req,res) => {
    FactionInfo.getFactionData()
        .then(factions => res.status(200).json(factions))
})

router.get('/api/faction/units/:factionId', (req,res) => {
    FactionInfo.getThisFactionsUnits(req.params.factionId)
        .then(factions => res.status(200).json(factions))
})


module.exports = router