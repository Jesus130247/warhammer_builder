const FactionInfo = require('../models/factions.js')
const db = require('pool')

async function storeFactionData() {
    let res = await FactionInfo.getFactionData()
    for (let faction_id in res) {
        // storeUnitData(faction_id)
        // faction_id = faction_id -> factions
    }
    return
}

async function storeUnitData(faction_id) {
    let res = await FactionInfo.getThisFactionsUnits(faction_id)
    for (let unit_id in res) {
    }
}
