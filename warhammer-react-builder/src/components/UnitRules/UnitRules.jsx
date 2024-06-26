
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
    let rangedWeapons = weaponRules.filter(weapon => weapon[2] !== 'Melee')
    let meleeWeapons = weaponRules.filter(weapon => weapon[2] === 'Melee')
    console.log(rangedWeapons[0])
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
            <h3>wargear options:</h3>
            <p dangerouslySetInnerHTML={{__html : wargearOptionsHTML}}></p>
            <h3>ranged weapons:</h3>
            <p dangerouslySetInnerHTML={{__html : rangedWeapons}}></p>
            <h3>melee weapons:</h3>
            <p dangerouslySetInnerHTML={{__html : meleeWeapons}}></p>
            <p dangerouslySetInnerHTML={{__html : unitComp}}></p>
            {ptsCost.map((option,idx) => {
                return (
                <div key={idx} >
                    <p>{option[0]} for {option[1]}</p>
                    <button onClick={() => addUnit(option[1], unitName)}>Add this unit to your army</button>
                </div>
                )
            })}
        </div>
        </>
    )
}