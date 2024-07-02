import styles from './UserArmy.module.css'
import { useState } from 'react'

export default function UserArmy(
    {
    armyName,selectedSubFaction,usersArmy, handleCancel, setRemainingPoints,
    pointLimit,remainingPoints,selectedArmy,removeUnit, colour, handleSave, subFactionDataEnhancements
    }) {
    const [selectedEnhancement, setSelectedEnhancement] = useState([]) 
    function handleEnchancement(e) {
        let pointsCost = e.target.id
        let name = e.target.name
        let alreadySelected = selectedEnhancement.map(enhancement => Object.keys(enhancement)[0])
        if (alreadySelected.includes(name)) {
            setSelectedEnhancement(selectedEnhancement.filter(enhancement => Object.keys(enhancement)[0] !== name))
            setRemainingPoints(remainingPoints + Number(pointsCost))
        } else {
            setSelectedEnhancement([...selectedEnhancement, {[name]:pointsCost}])
            setRemainingPoints(remainingPoints - Number(pointsCost))
        }
    }
    return (
    <div className={styles.containerForArmySelection}>
        {armyName ? <h2 style={{color: colour}}>{armyName} <button className={styles.saveBtn} onClick={handleSave} >Save Army</button></h2>
        :<h2 style={{color: colour}}>Your Army: <button className={styles.saveBtn} onClick={handleSave} >Save Army</button></h2>
        } 
        <h3>{selectedSubFaction}</h3>
        {subFactionDataEnhancements.map(enhancement => {
            return (
                <div className={styles.checkBox}>
                <input type="checkbox" id={enhancement[2]} name={enhancement[0]} pts={enhancement[2]} onChange={handleEnchancement} />
                <div>{enhancement[0]} - <span style={{color: colour}}>{enhancement[2]}pts</span></div>
                </div>
            )
        })}
        <p>Point Limit: {pointLimit} w/ <span style={{fontWeight: 700}}>{remainingPoints}</span> pts remaining</p>
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