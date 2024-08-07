const FactionInfo = require('../models/factions.js')
require('dotenv').config()
const db = require('./index.js')

async function storeFactionData() {
    let res = await FactionInfo.getFactionData()
    for (let faction_id in res) {
        sql = `INSERT INTO factions 
        (faction_id, faction_info) 
        VALUES ($1, $2) ;`
        db.query(sql, [faction_id, JSON.stringify(res[faction_id])], (res, err) => {
            if (err) console.log(err)
        })
        // if (faction_id === 'SM') {
        //     storeUnitData(faction_id)
        // }

    }
    return
}
storeFactionData()
async function storeUnitData(faction_id) {
    let res = await FactionInfo.getThisFactionsUnits(faction_id)
    console.log(faction_id)
    for (let unit_id in res) {
        sql = `INSERT INTO units 
        (faction_id, unit_id, unit_data) 
        VALUES ($1, $2, $3);`
        db.query(sql, [faction_id, unit_id, JSON.stringify(res[unit_id])])
    }
    return
}



// storeUnitData('NEC')
// storeUnitData('TS')
// storeUnitData('ORK')
// storeUnitData('TAU')

// no unaligned forces data 
 
// AE AM GC TL 
// GK AoI AdM UN 

// NEC TS ORK TAU 
// LoV QT WE QI
// AC CSM TYR DRU
// AS CD DG SM

// data gathered 