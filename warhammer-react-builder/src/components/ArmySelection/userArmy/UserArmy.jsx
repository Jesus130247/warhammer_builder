import styles from './UserArmy.module.css'

export default function UserArmy(
    {
    armyName,selectedSubFaction,usersArmy, handleCancel,
    pointLimit,remainingPoints,selectedArmy,removeUnit, colour, handleSave
    }) {
    
    return (
    <div className={styles.containerForArmySelection}>
        {armyName ? <h2 style={{color: colour}}>{armyName} <button className={styles.saveBtn} onClick={handleSave} >Save Army</button></h2>
        :<h2 style={{color: colour}}>Your Army: <button className={styles.saveBtn} onClick={handleSave} >Save Army</button></h2>
        } 
        <h3>{selectedSubFaction}</h3>
        <p>Point Limit: {pointLimit} w/ <span style={{fontWeight: 700}}>{remainingPoints}</span> pts remaining</p>
        <div style={{fontWeight: 700}}>Your Army So far:</div>
        <ul> 
            {usersArmy.map((unit,idx) => {
                return (
                    <div className={styles.unit}>
                        <li className={styles.list} key={idx}>
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