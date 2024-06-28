const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// const filesArray = [ // use for current api
//     // was ../../, but when run through the server.js, it takes that as initial spot
//     'dataFiles/Factions.csv', //0
//     'dataFiles/Datasheets.csv', //1
//     'dataFiles/Datasheets_abilities.csv', //2
//     'dataFiles/Datasheets_keywords.csv', //3
//     'dataFiles/Datasheets_models.csv', //4
//     'dataFiles/Datasheets_options.csv', //5
//     'dataFiles/Datasheets_wargear.csv', //6
//     'dataFiles/Datasheets_unit_composition.csv', //7
//     'dataFiles/Datasheets_models_cost.csv', //8
//     // '../../dataFiles/Datasheets_stratagems.csv',
//     // '../../dataFiles/Datasheets_enhancements.csv',
//     // '../../dataFiles/Datasheets_detachment_abilities.csv',
//     // '../../dataFiles/Stratagems.csv', // dont use
//     'dataFiles/Abilities.csv', //9
//     'dataFiles/Enhancements.csv', //10
//     'dataFiles/Detachment_abilities.csv', //11
//     'dataFiles/Last_update.csv', //12
//     'dataFiles/Datasheets_leader.csv', //13
//     // 'dataFiles/Source.csv', // dont use // 13
// ];

const filesArray = [
    // was ../../, but when run through the server.js, it takes that as initial spot
    '../dataFiles/Factions.csv', //0
    '../dataFiles/Datasheets.csv', //1
    '../dataFiles/Datasheets_abilities.csv', //2
    '../dataFiles/Datasheets_keywords.csv', //3
    '../dataFiles/Datasheets_models.csv', //4
    '../dataFiles/Datasheets_options.csv', //5
    '../dataFiles/Datasheets_wargear.csv', //6
    '../dataFiles/Datasheets_unit_composition.csv', //7
    '../dataFiles/Datasheets_models_cost.csv', //8
    // '../../dataFiles/Datasheets_stratagems.csv',
    // '../../dataFiles/Datasheets_enhancements.csv',
    // '../../dataFiles/Datasheets_detachment_abilities.csv',
    // '../../dataFiles/Stratagems.csv', // dont use
    '../dataFiles/Abilities.csv', //9
    '../dataFiles/Enhancements.csv', //10
    '../dataFiles/Detachment_abilities.csv', //11
    '../dataFiles/Last_update.csv', //12
    '../dataFiles/Datasheets_leader.csv', //13
    // 'dataFiles/Source.csv', // dont use // 13
];

function reformatData(data) {
    let dataArray = data.split('\n').map(line => line.split('|'))
    return dataArray
}

async function getFactionData() {
    let allFactions = await getFractionNames(filesArray[0])
    for (let factionId in allFactions) {
        allFactions[factionId] = [...allFactions[factionId], await getFactionAbilities(filesArray[9], factionId)]
        allFactions[factionId] = [...allFactions[factionId], await getDetachmentEnhancements(filesArray[10], factionId)]
    }
    return allFactions
}

async function getThisFactionsUnits(factionId) {
    let factionUnits = await getFactionUnits(filesArray[1],factionId)
    for (let unitId in factionUnits) {
        factionUnits[unitId] = [...factionUnits[unitId] , await getUnitAbilities(filesArray[2], unitId)]
        factionUnits[unitId] = [...factionUnits[unitId] , await getUnitKeyWords(filesArray[3], unitId)]
        factionUnits[unitId] = [...factionUnits[unitId] , await getUnitData(filesArray[4], unitId)]
        factionUnits[unitId] = [...factionUnits[unitId] , await getDatasheetOptions(filesArray[5], unitId)]
        factionUnits[unitId] = [...factionUnits[unitId] , await getDatasheetWargear(filesArray[6], unitId)]
        factionUnits[unitId] = [...factionUnits[unitId] , await getUnitComposition(filesArray[7], unitId)]
        factionUnits[unitId] = [...factionUnits[unitId] , await getUnitCost(filesArray[8], unitId)]
        factionUnits[unitId] = [...factionUnits[unitId] , await getLeader(filesArray[13], unitId)]
    }
    return factionUnits
}

async function getLeader(file, unitId) {
    const data = await readFile(file,'utf-8');
    const leader = reformatData(data).filter(data => data[0] === unitId)
    let canLead = []
    for (let unitLed of leader) {
        canLead.push( await getUnitName(filesArray[1],unitLed[1]))
    }
    return canLead
}

async function getUnitName(file, unitId) {
    const data = await readFile(file,'utf-8');
    let unit = reformatData(data).filter(data => data[0] === unitId)
    if (unit[0]) {
        return unit[0][1]
    }
}
async function getDetachmentEnhancements(file, factionId) {
    const data = await readFile(file, 'utf-8');
    let factionEnhancement = reformatData(data).filter((data) => data[0] === factionId)
    let enhancementChoices = {}
    for (let enhancement of factionEnhancement) {
        let detachment = enhancement[6]
        if(enhancementChoices[detachment]) {
            enhancementChoices[detachment].push([enhancement[2],enhancement[4], enhancement[5]]) // name of enhancment, rule, points cost
        } else {
            let deatchmentRule = await getDetachmentAbilties(filesArray[11], factionId, detachment)
            enhancementChoices[detachment] = [deatchmentRule, [enhancement[2], enhancement[4], enhancement[5]]]
        }
    }
    return enhancementChoices
}

async function getDetachmentAbilties(file, factionId, detachment) {
    const data = await readFile(file, 'utf-8');
    let detachmentRules = reformatData(data).filter((data) => data[1] === factionId)
    let detachmentRulesReturn = {}
    for (let detachmentRule of detachmentRules) {
        if (detachment === detachmentRule[5]) {
            return detachmentRule[4]
        }
    }
}

async function getFactionAbilities(file, factionId) {
    const data = await readFile(file, 'utf-8');
    let factionAbility = reformatData(data).filter((data) => data[3] === factionId)
    let factionAbilityReturn = {[factionAbility[0][1]] : factionAbility[0][4]}
    return factionAbilityReturn
}

async function getUnitCost(file, unitId) {
    const data = await readFile(file, 'utf-8');
    let unitCost = reformatData(data).filter((data) => data[0] === unitId)
    if (unitCost[0]) {
        return unitCost.map(cost => [cost[2], cost[3]])
    }
}

async function getUnitComposition(file, unitId) {
    const data = await readFile(file, 'utf-8');
    let unitComp = reformatData(data).filter((data) => data[0] === unitId)
    if (unitComp[0]) {
        return unitComp.map(comp => comp[2])
    }
}

async function getDatasheetWargear(file, unitId) {
    const data = await readFile(file, 'utf-8');
    let wargearOptions = reformatData(data).filter((data) => data[0] === unitId)
    if (wargearOptions[0]) {
        return wargearOptions.map(option => option.slice(4,13))
    }
}

async function getDatasheetOptions(file, unitId) {
    const data = await readFile(file, 'utf-8');
    let wargearOptions = reformatData(data).filter((data) => data[0] === unitId)
    let options = []
    if (wargearOptions[0]) {
        for (let wargear of wargearOptions) {
            options.push(wargear[3])
        }
        // for (let options of wargearOptions)
        return options
    }
}

async function getUnitData(file, unitId) {
    const data = await readFile(file, 'utf-8');
    let unitData = reformatData(data).filter((data) => data[0] === unitId)
    if (unitData[0]) {
        return unitData[0].slice(3,11)
    }
}

async function getUnitAbilities(file, unitId) {
    const data = await readFile(file, 'utf-8');
    const unitSpecialAbilities = await readFile(filesArray[9], 'utf-8');
    let coreAbilities = reformatData(unitSpecialAbilities)
    let abilties = reformatData(data).filter((data) => data[0] === unitId)
    let allAbilties = {}
    let specialAbilities = []
    for (let singleUnitAbilites of abilties) {
        if (singleUnitAbilites[2] !== '') {
            let coreAbility = coreAbilities.filter(ruleId => ruleId[0] === singleUnitAbilites[2])
            specialAbilities.push(coreAbility[0][1] + ' ' + singleUnitAbilites[7])
        }
        if (singleUnitAbilites[4] !== '') {
            allAbilties[singleUnitAbilites[4]] = singleUnitAbilites[5] // ability = ability description 
        }
    }
    allAbilties['coreAbilities'] = specialAbilities.slice(0,-1)
    allAbilties['factionKeyword'] = specialAbilities.slice(-1)
    return allAbilties
}

async function getUnitKeyWords(file, unitId) {
    const data = await readFile(file, 'utf-8');
    let keyWords = reformatData(data).filter((data) => data[0] === unitId)
    let allKeyWords = []
    for (let singleUnitKeyWords of keyWords) {
        allKeyWords.push(singleUnitKeyWords[1])
    }
    return allKeyWords.filter(data => data !== '')
}

async function getFactionUnits(file, name) {  // allows me to search by faction initials
    const data = await readFile(file, 'utf-8');
    let unitNames = reformatData(data).filter(data => data[2] === name && data[4] !== '').reduce((accum,unitInfo) =>  {
        accum[unitInfo[0]] = [unitInfo[1],unitInfo[5],unitInfo[6]] // [name, role, loadout]
        return accum
    }, {});
    return unitNames;
}

async function getFractionNames(file) {
    const data = await readFile(file, 'utf-8');
    let factionNames = reformatData(data).reduce((accum,factionInfo) => {
        if (factionInfo[1] !== 'name' && factionInfo[1] !== undefined) {
            accum[factionInfo[0]] = [factionInfo[1], factionInfo[3]]
        }
        return accum
    }, {});
    return factionNames;
}

// async function initialiseProgram() {
//     // const data = await getDatasheetOptions()
//     // console.log(data)
//     // const data = await getFactionData()
//     console.log(await getThisFactionsUnits('WE'))
// // }
// initialiseProgram()

const FactionInfo = {
    getThisFactionsUnits,
    getFactionData
}

module.exports = FactionInfo