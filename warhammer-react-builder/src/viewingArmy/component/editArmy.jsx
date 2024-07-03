import styles from './EditArmy.module.css'
import ArmyCreation from '../../components/ArmyCreation/ArmyCreation'
import UserArmy from '../../components/ArmySelection/userArmy/UserArmy'
import { useState, useEffect } from 'react'

export default function EditArmy({addUnit,armyId,colour,selectedArmy,handleCancel,armyName,selectedSubFaction,pointLimit,
    removeUnit,usersArmy,remainingPoints,handleSave, subFactionInfo, setRemainingPoints, setSelectedEnhancement, selectedEnhancement, handleEnchancement}) {
        const [subFactionDataEnhancements, setSubFactionDataEnhancements] = useState([])
        if (selectedArmy && selectedSubFaction) {
        useEffect(() => {
            setSubFactionDataEnhancements(subFactionInfo[selectedSubFaction[0]].slice(1))
        },[])
    }
    return (
        <>
        <div className={styles.ArmySelection}>  
            <div className={styles.containerForUnits}>
                <ArmyCreation 
                addUnit={addUnit} // import from App
                armyId={armyId} // use state for view army selection
                colour={colour} // use state for view army selection
                // wants the fetch for the army (below)
                selectedArmy={selectedArmy}/>
            </div>
            <UserArmy 
            handleCancel={handleCancel} // import
            colour={colour} //
            armyName={armyName} // army.army_name
            selectedArmy={selectedArmy} // use state for view army selection
            selectedSubFaction={subFactionInfo} // army.subfaction_chosen
            pointLimit={pointLimit} //army.pointLimit
            removeUnit={removeUnit} //import from app
            usersArmy={usersArmy}  // need [unitId, unitName, unitPts]
            remainingPoints={remainingPoints} //army.pointLimit - army.points
            handleSave={handleSave} //import from app

            subFactionDataEnhancements={subFactionDataEnhancements}
            setRemainingPoints={setRemainingPoints}
            setSelectedEnhancement={setSelectedEnhancement}
            selectedEnhancement={selectedEnhancement}
            handleEnchancement={handleEnchancement}
            />
        </div></>
    )
}