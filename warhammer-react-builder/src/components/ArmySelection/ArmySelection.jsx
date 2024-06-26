import { useState } from "react"
import { useEffect } from "react"
import ArmyCreation from "../ArmyCreation/ArmyCreation"
import styles from './ArmySelection.module.css'
import UserArmy from "./userArmy/UserArmy"

export default function ArmySelection({selectedArmy, selectedSubFaction, pointLimit, colour, armyName, 
    handleCancel, setUsersArmy, usersArmy, handleSave, remainingPoints, setRemainingPoints, addUnit, removeUnit}) {

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
            handleCancel={handleCancel}
            colour={colour}
            armyName={armyName} 
            selectedArmy={selectedArmy} 
            selectedSubFaction={selectedSubFaction}
            pointLimit={pointLimit}
            removeUnit={removeUnit}
            usersArmy={usersArmy}
            remainingPoints={remainingPoints}
            handleSave={handleSave}
            />
        </div>
    )
}