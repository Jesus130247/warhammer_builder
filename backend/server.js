const fs = require('fs');
const util = require('util');

const filesArray = [
    '../dataFiles/Factions.csv',
    // '../dataFiles/Source.csv',
    '../dataFiles/Datasheets.csv', 
    '../dataFiles/Datasheets_abilities.csv',
    '../dataFiles/Datasheets_keywords.csv',
    '../dataFiles/Datasheets_models.csv',
    '../dataFiles/Datasheets_options.csv',
    '../dataFiles/Datasheets_wargear.csv',
    '../dataFiles/Datasheets_unit_composition.csv',
    '../dataFiles/Datasheets_models_cost.csv',
    '../dataFiles/Datasheets_stratagems.csv',
    '../dataFiles/Datasheets_enhancements.csv',
    '../dataFiles/Datasheets_detachment_abilities.csv',
    '../dataFiles/Datasheets_leader.csv',
    '../dataFiles/Stratagems.csv',
    '../dataFiles/Abilities.csv',
    '../dataFiles/Enhancements.csv',
    '../dataFiles/Detachment_abilities.csv',
    '../dataFiles/Last_update.csv'
];

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

// function readAllData(file) {
//     // files.forEach(file => {
//         fs.readFile(file, 'utf-8', (err, data) => {
//             if (err) console.log(err)
//             console.log(reformatData(data))
//         })
//     // })
// }

function reformatData(data) {
    let dataArray = data.split('\n').map(line => line.split('|'))
    return dataArray
}

async function getFactionUnits(file = filesArray[1], name = 'WE') {  // allows me to search by faction initials
    await readFile(file, 'utf-8', (err, data) => {
        if (err) console.log(err)
        let unitNames = reformatData(data).filter(data => data[2] === name).map(unitArray => unitArray[1])
        console.log('2')
        return unitNames
    })
    console.log('we got out')
    return 
}

async function getFactionData() {
    console.log('1')
    let factionUnits = await getFactionUnits()
    console.log('3')
}

getFactionData()
// getFactionNames()
// readAllData(filesArray[0])