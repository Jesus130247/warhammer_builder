import styles from './UserArmy.module.css'
import { useState } from 'react'
import EnhancementCheckbox from './enhancementCheckBox/EnhancementCheckbox'

export default function UserArmy(
    {
    armyName,selectedSubFaction,usersArmy, handleCancel, setRemainingPoints, setSelectedEnhancement, selectedEnhancement,
    pointLimit,remainingPoints,selectedArmy,removeUnit, colour, handleSave, subFactionDataEnhancements, handleEnchancement
    }) {
    let subFactionName
    let subFactionRule
    if (selectedSubFaction) {
        subFactionName = Object.keys(selectedSubFaction)[0]
        subFactionRule = Object.entries(selectedSubFaction)[0][1][0]
    }
    console.log(selectedEnhancement)
    return (
    <div className={styles.containerForArmySelection}>
        {armyName ? <h2 style={{color: colour}}>{armyName} <button className={styles.saveBtn} onClick={handleSave} >Save Army</button></h2>
        :<h2 style={{color: colour}}>Your Army: <button className={styles.saveBtn} onClick={handleSave} >Save Army</button></h2>
        } 
        <h3>{subFactionName}</h3>
        <p>Point Limit: {pointLimit} w/ <span style={{fontWeight: 700}}>{remainingPoints}</span> pts remaining</p>
        <EnhancementCheckbox 
        subFactionDataEnhancements={subFactionDataEnhancements} 
        handleEnchancement={handleEnchancement} 
        colour={colour}
        selectedEnhancement={selectedEnhancement}
        />
        <div style={{fontWeight: 700}}>Your Army So far:</div>
        
        <ul> 
            {usersArmy.map((unit,idx) => {
                return (
                    <div className={styles.unit} key={idx}>
                        <li className={styles.list}>
                            <span>{unit[1]}</span><br />
                            <span style={{color: colour}}>{unit[2]} pts</span>
                        </li>
                        <div className={styles.deleteBtn} value={unit}  id={idx} onClick={removeUnit} style={{color: colour}}>delete this unit</div>
                    </div>
                )
            })}
        </ul>
    </div>
    )
}