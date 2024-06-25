
export default function UnitRules({unitInfo, addUnit}) {
    let [unitName, 
        abilityArray,
        armyKeyWordArray,
        statsArray,
        wargearOptionsHTML,
        weaponRules,
        unitComp,
        ptsCost
    ] = unitInfo
    let [
        movement,
        toughess,
        armourSave,
        invulSave,
        invulSaveConditions,
        wounds,
        leaderShip,
        OC
    ] = statsArray
    return(
        <>
        <h3>Rules For {unitName}</h3>
        <div className="UnitRules">
            <p>Abilites: {abilityArray.join(', ')}</p>
            <p>KeyWords: {armyKeyWordArray}</p>
            <div>unit stats: 
                <ul>
                    <li>M: {movement}</li>
                    <li>T: {toughess}</li>
                    <li>Sv: {armourSave}</li>
                    <li>InVul:{invulSave} {invulSaveConditions}</li>
                    <li>W: {wounds}</li>
                    <li>Ld: {leaderShip}</li>
                    <li>OC: {OC}</li>
                </ul>
            </div>
            <p dangerouslySetInnerHTML={{__html : wargearOptionsHTML}}></p>
            <p dangerouslySetInnerHTML={{__html : weaponRules}}></p>
            <p>Composition: {unitComp}</p>
            <p>UnitCost: {ptsCost[1]} pts</p>
        </div>
        <button onClick={() => addUnit(ptsCost[1])}>Add this unit to your army</button>
        </>
    )
}