import styles from './UnitRules.module.css'
import Weapon from '../weaponStats/Weapon'

export default function UnitRules({unitInfo, addUnit, colour}) {
    let [unitname, 
        role,
        startingWargear,
        transportCapcity,
        damagedData,
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
        unitname2,
        movement,
        toughess,
        armourSave,
        invulSave,
        invulSaveConditions,
        wounds,
        leaderShip,
        ...OC
    ] = statsArray[0]
    let leaderName
    let movementExarch
    let toughess2
    let armourSave2
    let invulSave2
    let invulSaveConditions2
    let wounds2
    let leaderShip2
    let  oC2
    if (statsArray[1]) {
        [
            leaderName,
            movementExarch,
            toughess2,
            armourSave2,
            invulSave2,
            invulSaveConditions2,
            wounds2,
            leaderShip2,
            oC2
        ] = statsArray[1]
    }
    let meleeWeapons = []
    let rangedWeapons = []
    if (weaponRulesArray) {
        rangedWeapons = weaponRulesArray.filter(weapon => weapon[2] !== 'Melee')
        meleeWeapons = weaponRulesArray.filter(weapon => weapon[2] === 'Melee')
    }
    return(
    <div className={styles.showUnitRules}>
        <h2 style={{color: colour}}>{unitname}</h2>
        <div className={styles.stats}>
            <div>M  <div>{movement}</div></div>
            <div>T  <div>{toughess}</div></div>
            <div>Sv  <div>{armourSave}</div></div>
            <div>W  <div>{wounds}</div></div>
            <div>Ld  <div>{leaderShip}</div></div>
            <div>OC  <div>{OC}</div></div>
            <div></div>
        </div>
        {statsArray[1] 
        ? <div className={styles.stats}>
            <div>M  <div>{movementExarch}</div></div>
            <div>T  <div>{toughess2}</div></div>
            <div>Sv  <div>{armourSave2}</div></div>
            <div>W  <div>{wounds2}</div></div>
            <div>Ld  <div>{leaderShip2}</div></div>
            <div>OC  <div>{oC2}</div></div>
            <div> - {leaderName}</div>
        </div>
        : <></> }

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
                </div>
                <div>{meleeWeapons.length 
                    ? <table className={styles.table}>
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
                    </table> : <></>}
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
            <div className={styles.left2}>
                <h3 style={{color: colour}}>Wargear options:</h3>
                {wargearOptionsArray ? wargearOptionsArray.map(wargearOptionsHTML => {
                    return (
                    <li style={{fontSize: '0.85rem'}}dangerouslySetInnerHTML={{__html : wargearOptionsHTML}}></li>
                    )
                }) : <>None</>}
                <div className={styles.abilities}> <p className={styles.abilityName} style={{color: colour}}>Abilities:</p>
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
                    {unitCompArray.map(unitComp => <div dangerouslySetInnerHTML={{__html : unitComp}}></div>)}
                </span> 
                {transportCapcity !== '' ? <div style={{marginTop: '10px'}} dangerouslySetInnerHTML={{__html:transportCapcity}}></div> : <></>}
                {damagedData !== '' ? <div style={{marginTop: '10px'}} dangerouslySetInnerHTML={{__html:damagedData}}></div> : <></>}
                <div className={styles.unitRules}> 
                {ptsCost ? ptsCost.map((option,idx) => {
                    return (
                        <div key={idx} >
                        <h4>{option[0]} for {option[1]} pts</h4>
                        <button  style={{color: colour}} className={styles.btn}onClick={() => addUnit(unitInfo[1].id, option[1], `${option[0].split(' ')[0]} ${unitname}`)}>Add this type to your army</button>
                    </div>
                    )
                }) : <>
                    <div >
                        <h4>1 Model for 165 pts</h4>
                        <button  style={{color: colour}} className={styles.btn}onClick={() => addUnit('3278', 165, `1 ${unitname}`)}>Add this type to your army</button>
                    </div></>}
                </div>
                {role === "Characters" && leader.length > 0 
                ? <>
                <div className={styles.leader} style={{color: colour}}>This modal can lead:</div>
                {leader.map(unit => {
                    return (<div>{unit}</div>)
                })}
                </>
                : <></> } 
            </div>
        </div>
            <h4 style={{color: colour}}>Keywords: {armyKeyWordArray.join(', ')}</h4>
    </div>
    )
}