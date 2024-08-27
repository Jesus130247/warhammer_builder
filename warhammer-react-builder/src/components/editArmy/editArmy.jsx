import styles from './EditArmy.module.css'
import ArmyCreation from '../ArmyCreation/ArmyCreation'
import UserArmy from '../userArmy/UserArmy'
import { useState, useEffect } from 'react'

export default function EditArmy({addUnit,armyId,colour,selectedArmy,handleCancel,armyName,selectedSubFaction,pointLimit,
    removeUnit,usersArmy,remainingPoints,handleSave, subFactionInfo, setRemainingPoints, setSelectedEnhancement, selectedEnhancement, handleEnchancement}) {
        const [subFactionDataEnhancements, setSubFactionDataEnhancements] = useState([])
        const [subFactionRule, setSubFactionRule] = useState()
        if (selectedArmy && selectedSubFaction) {
            if (selectedSubFaction.length) {
                useEffect(() => {
                    Object.entries(subFactionInfo).forEach(subFaction => {
                        if (subFaction[0] === selectedSubFaction[0]) {
                            setSubFactionRule({[selectedSubFaction[0]]:subFaction[1].slice(0,1)})
                            setSubFactionDataEnhancements(subFaction[1].slice(1))
                        }
                    })
                },[])
            }
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
            selectedSubFaction={subFactionRule} // army.subfaction_chosen
            pointLimit={pointLimit} //army.pointLimit
            removeUnit={removeUnit} //import from app
            usersArmy={usersArmy}  // need [unitId, unitName, unitPts]
            remainingPoints={remainingPoints} //army.pointLimit - army.points
            handleSave={handleSave} //import from app

            subFactionDataEnhancements={subFactionDataEnhancements}
            setRemainingPoints={setRemainingPoints}
            selectedEnhancement={selectedEnhancement}
            handleEnchancement={handleEnchancement}
            />
        </div></>
    )
}