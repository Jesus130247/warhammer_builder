import styles from './UnitRules.module.css'

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
    return(
    <div className={styles.showUnitRules}>
        <h2>{unitName}</h2>
            <div className={styles.stats}>
                <div>M:  <div>{movement}</div></div>
                <div>T:  <div>{toughess}</div></div>
                <div>Sv:  <div>{armourSave}</div></div>
                <div>W:  <div>{wounds}</div></div>
                <div>Ld:  <div>{leaderShip}</div></div>
                <div>OC:  <div>{OC}</div></div>
            </div>
            <div className={styles.inVuln}>
                {invulSave}+ Invulnerable save
                <span>*{invulSaveConditions}*</span>
            </div>
        <div className={styles.unitRules}> 
            <p dangerouslySetInnerHTML={{__html : startingWargear}}></p>
            <h3>wargear options:</h3>
            <p dangerouslySetInnerHTML={{__html : wargearOptionsHTML}}></p>
            <div className={styles.containerForRules}>
                <div className={styles.weapons}>
                    <h3>ranged weapons
                        <div>Range
                            <div>A</div>
                            <div>BS</div>
                            <div>S</div>
                            <div>AP</div>
                            <div>D</div>
                        </div>
                    </h3>
                    <p dangerouslySetInnerHTML={{__html : rangedWeapons}}></p>
                    <h3>melee weapons
                        <div>Range
                            <div>A</div>
                            <div>BS</div>
                            <div>S</div>
                            <div>AP</div>
                            <div>D</div>
                        </div>
                    </h3>
                    <p dangerouslySetInnerHTML={{__html : meleeWeapons}}></p>
                </div>
                <div> <h4>Abilities</h4>
                    {Object.keys(abilityObject).map(ability => {
                        if (ability !== 'coreAbilities' && ability !== 'factionKeyword') {
                            return (ability)
                        } else {
                            return <p>{abilityObject[ability].join(' ')}</p>
                        }
                    })}
                    <p dangerouslySetInnerHTML={{__html : unitComp}}></p>
                </div>
            </div>

            {ptsCost.map((option,idx) => {
                return (
                <div key={idx} >
                    <p>{option[0]} for {option[1]}</p>
                    <button onClick={() => addUnit(option[1], unitName)}>Add this unit to your army</button>
                </div>
                )
            })}
            <h4>Keywords: {armyKeyWordArray.join(', ')}</h4>
        </div>
    </div>
    )
}