import { useState } from "react"
import { useEffect } from "react"
import ArmyCreation from "../ArmyCreation/ArmyCreation"
import styles from './ArmySelection.module.css'

export default function ArmySelection({selectedArmy, selectedSubFaction}) {
    const [armyPoints ,setArmyPoints] = useState(2000)
    const [usersArmy, setUsersArmy] = useState([])
    
    console.log(selectedSubFaction)

    function addUnit(pts, unitName) {
        setArmyPoints(armyPoints-pts)
        setUsersArmy([...usersArmy, unitName])
    }
    function removeUnit(e) {
        console.log(e.target)
        setUsersArmy(usersArmy.filter((unit,idx) => idx !== Number(e.target.id)))
    }
    return (
        <div className={styles.ArmySelection}>  
            <div className="container-for-army-selection">
                <h2>{selectedArmy.factionInfo[0]}</h2>
                <h3>{selectedSubFaction}</h3>
                <p>w/ {armyPoints} pts remaining</p>
                <ul> Your Army So far:
                    {usersArmy.map((unit,idx) => {
                        return (
                            <li key={idx}>{unit}<button value={unit}  id={idx} onClick={removeUnit}>delete this unit</button></li>
                        )
                    })}
                </ul>
            </div>
            <div className={styles.containerForUnits}>
                <ArmyCreation addUnit={addUnit} armyId={selectedArmy.factionId} armyName={selectedArmy.factionInfo[0]}/>    
            </div>
        </div>
    )
}