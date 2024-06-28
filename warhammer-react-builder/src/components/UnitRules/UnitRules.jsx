import styles from './UnitRules.module.css'
import Weapon from './weaponStats/Weapon'

export default function UnitRules({unitInfo, addUnit, colour}) {
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
        <h2 style={{color: colour}}>{unitName}</h2>
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
                            <td className={styles.weaponTitle}>Ranged weapons</td>
                            <td>Range</td>
                            <td>A</td>
                            <td>BS</td>
                            <td>S</td>
                            <td>AP</td>
                            <td>D</td>
                        </tr>
                        {rangedWeapons.map((weaponStats,idx) => {
                            return (
                                <Weapon weaponStats={weaponStats} idx={idx} />
                            )
                        })}
                    </table> : <></>}
                    <table className={styles.table}>
                        <tr className={styles.tableTitle}>
                            <td className={styles.weaponTitle}>Melee weapons</td>
                            <td>Range</td>
                            <td>A</td>
                            <td>WS</td>
                            <td>S</td>
                            <td>AP</td>
                            <td>D</td>
                        </tr>
                        {meleeWeapons.map((weaponStats,idx) => {
                            return (
                                <Weapon weaponStats={weaponStats} idx={idx} />
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
                <h3>wargear options:</h3>
                <div dangerouslySetInnerHTML={{__html : wargearOptionsHTML}}></div>
                <div> <p className={styles.abilityName}>Abilities:</p>
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
                    <h4>Unit Composiiton</h4>
                    <div dangerouslySetInnerHTML={{__html : unitComp}}></div>
                </span> 
                <div className={styles.unitRules}> 
                {ptsCost.map((option,idx) => {
                    return (
                        <div key={idx} >
                        <h4>{option[0]} for {option[1]} pts</h4>
                        <button  style={{color: colour}} className={styles.btn}onClick={() => addUnit(option[1], unitName)}>Add this type to your army</button>
                    </div>
                    )
                })}
                </div>
            </div>
        </div>
            <h4>Keywords: {armyKeyWordArray.join(', ')}</h4>
    </div>
    )
}