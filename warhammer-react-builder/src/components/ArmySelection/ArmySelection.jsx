import { useState } from "react"
import { useEffect } from "react"
import ArmyCreation from "../ArmyCreation/ArmyCreation"
import styles from './ArmySelection.module.css'
import UserArmy from "./userArmy/UserArmy"

export default function ArmySelection({selectedArmy, selectedSubFaction, pointLimit, colour, armyName}) {
    const [remainingPoints ,setRemainingPoints] = useState(pointLimit)
    const [usersArmy, setUsersArmy] = useState([])

    function addUnit(pts, unitName) {
        setRemainingPoints(remainingPoints-pts)
        setUsersArmy([...usersArmy, [unitName, pts]])
    }
    function removeUnit(e) {
        let pts
        setUsersArmy(usersArmy.filter((unit,idx) => {
            pts = Number(unit[1])
            return idx !== Number(e.target.id)
        }))
        setRemainingPoints(remainingPoints+pts)
    }
    return (
        <div className={styles.ArmySelection}>  
            <div className={styles.containerForUnits}>
                <ArmyCreation 
                addUnit={addUnit} 
                armyId={selectedArmy.faction_id}
                colour={colour}
                selectedArmy={selectedArmy}/>    
            </div>
            <UserArmy 
            colour={colour}
            armyName={armyName} 
            selectedArmy={selectedArmy} 
            selectedSubFaction={selectedSubFaction}
            pointLimit={pointLimit}
            removeUnit={removeUnit}
            usersArmy={usersArmy}
            remainingPoints={remainingPoints}
            />
        </div>
    )
}