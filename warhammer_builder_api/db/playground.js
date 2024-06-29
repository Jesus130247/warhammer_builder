const FactionInfo = require('../models/factions.js')
require('dotenv').config()
const db = require('./index.js')

async function storeFactionData() {
    let res = await FactionInfo.getFactionData()
    for (let faction_id in res) {
        // sql = `INSERT INTO factions 
        // (faction_id, faction_info) 
        // VALUES ($1, $2) 
        // RETURNING *`
        // db.query(sql, [faction_id, JSON.stringify(res[faction_id])], (res, err) => {
        //     if (err) console.log(err)
        // })
        storeUnitData(faction_id)

    }
    return
}

async function storeUnitData(faction_id) {
    let res = await FactionInfo.getThisFactionsUnits(faction_id)
    for (let unit_id in res) {
        sql = `INSERT INTO units 
        (faction_id, unit_id, unit_data) 
        VALUES ($1, $2, $3);`
        db.query(sql, [faction_id, unit_id, JSON.stringify(res[unit_id])])
    }
    return
}

async function addMoreSMData() {

}
// storeUnitData('SM')
// no unaligned forces data or space marines
 
// AoI  AM GC TL GK AE AdM UN NEC TS ORK TAU LoV QT WE QI AC CSM TYR DRU

// data gathered 