import styles from './UnitRules.module.css'
import Weapon from './weaponStats/Weapon'

export default function UnitRules({unitInfo, addUnit, colour}) {
    let [factionName, 
        role,
        startingWargear,
        abilityObject,
        armyKeyWordArray,
        statsArray,
        wargearOptionsArray,
        weaponRulesArray,
        unitCompArray,
        ptsCost,
        leader
    ] = unitInfo[1].unit_data
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
    let rangedWeapons = weaponRulesArray.filter(weapon => weapon[2] !== 'Melee')
    let meleeWeapons = weaponRulesArray.filter(weapon => weapon[2] === 'Melee')
    return(
    <div className={styles.showUnitRules}>
        <h2 style={{color: colour}}>{factionName}</h2>
        <div className={styles.stats}>
            <div>M  <div>{movement}</div></div>
            <div>T  <div>{toughess}</div></div>
            <div>Sv  <div>{armourSave}</div></div>
            <div>W  <div>{wounds}</div></div>
            <div>Ld  <div>{leaderShip}</div></div>
            <div>OC  <div>{OC}</div></div>
        </div>
        <div className={styles.inVuln}>
            {invulSave}+ Invulnerable save
            <span>{invulSaveConditions}</span>
        </div>
        <div className={styles.containerForRules}>
            <div className="left">
                <div>{rangedWeapons.length 
                    ? <table className={styles.table}>
                        <tr className={styles.tableTitle}>
                            <td className={styles.weaponTitle} style={{color: colour}}>Ranged weapons</td>
                            <td style={{color: colour}}>Range</td>
                            <td style={{color: colour}}>A</td>
                            <td style={{color: colour}}>BS</td>
                            <td style={{color: colour}}>S</td>
                            <td style={{color: colour}}>AP</td>
                            <td style={{color: colour}}>D</td>
                        </tr>
                        {rangedWeapons.map((weaponStats,idx) => {
                            return (
                                <Weapon weaponStats={weaponStats} idx={idx} />
                            )
                        })}
                    </table> : <></>}
                    <table className={styles.table}>
                        <tr className={styles.tableTitle}>
                            <td className={styles.weaponTitle} style={{color: colour}}>Melee weapons</td>
                            <td style={{color: colour}}>Range</td>
                            <td style={{color: colour}}>A</td>
                            <td style={{color: colour}}>WS</td>
                            <td style={{color: colour}}>S</td>
                            <td style={{color: colour}}>AP</td>
                            <td style={{color: colour}}>D</td>
                        </tr>
                        {meleeWeapons.map((weaponStats,idx) => {
                            return (
                                <Weapon weaponStats={weaponStats} idx={idx} colour={colour} />
                            )
                        })}
                    </table>
                </div>
            </div>
            <div className="right">
                <div>
                    {Object.keys(abilityObject).map((ability,idx) => {
                        if (ability === 'coreAbilities' || ability === 'factionKeyword') {
                            return (<div key={idx} className={styles.abilityName}>{abilityObject[ability].join(' ')}</div>)
                        }
                    })}
                </div>
                <p dangerouslySetInnerHTML={{__html : startingWargear}}></p>
            </div>
            <div className="left2">
                <h3 style={{color: colour}}>Wargear options:</h3>
                {wargearOptionsArray ? wargearOptionsArray.map(wargearOptionsHTML => {
                    return (
                    <div dangerouslySetInnerHTML={{__html : wargearOptionsHTML}}></div>
                    )
                }) : <>None</>}
                <div> <p className={styles.abilityName} style={{color: colour}}>Abilities:</p>
                    {Object.keys(abilityObject).map((ability,idx) => {
                        if (ability !== 'coreAbilities' && ability !== 'factionKeyword') {
                            return (<div key={idx}>
                            <div className={styles.abilityName}>{ability} : </div>
                            <div className={styles.abilityDes} dangerouslySetInnerHTML={{__html: abilityObject[ability]}}></div>
                            </div>)
                        }
                    })}
                </div>
            </div>
            <div className="right2">
                <span>
                    <h4 style={{color: colour}}>Unit Composiiton</h4>
                    {unitCompArray.map(unitComp => {
                    <div dangerouslySetInnerHTML={{__html : unitComp}}></div>
                })}
                </span> 
                <div className={styles.unitRules}> 
                {ptsCost.map((option,idx) => {
                    return (
                        <div key={idx} >
                        <h4>{option[0]} for {option[1]} pts</h4>
                        <button  style={{color: colour}} className={styles.btn}onClick={() => addUnit(option[1], factionName)}>Add this type to your army</button>
                    </div>
                    )
                })}
                </div>
                {role === "Characters" && leader.length > 0 ? <>
                <div className={styles.leader} style={{color: colour}}>This modal can lead:</div>
                {leader.map(unit => {
                    return (<div>{unit}</div>)
                })}
                </>: <></>} 
            </div>
        </div>
            <h4 style={{color: colour}}>Keywords: {armyKeyWordArray.join(', ')}</h4>
    </div>
    )
}