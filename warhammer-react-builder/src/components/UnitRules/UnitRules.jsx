
export default function UnitRules({unitInfo, addUnit}) {
    let [unitName, 
        role,
        startingWargear,
        abilityObject,
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
        ...OC
    ] = statsArray
    console.log(ptsCost)
    return(
        <>
        <h3>Rules For {unitName}</h3>
        <div className="UnitRules">
            <p>Abilites: {Object.keys(abilityObject).join(', ')}</p>
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
            <p dangerouslySetInnerHTML={{__html : unitComp}}></p>
            {ptsCost.map((option,idx) => {
                return (
                <>
                    <p key={idx}>{option[0]} for {option[1]}</p>
                    <button onClick={() => addUnit(option[1], unitName)}>Add this unit to your army</button>
                </>
                )
            })}
        </div>
        </>
    )
}