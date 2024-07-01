import styles from './EditArmy.module.css'
import ArmyCreation from '../../components/ArmyCreation/ArmyCreation'
import UserArmy from '../../components/ArmySelection/userArmy/UserArmy'

export default function EditArmy({addUnit,armyId,colour,selectedArmy,handleCancel,armyName,selectedSubFaction,pointLimit,
    removeUnit,usersArmy,remainingPoints,handleSave}) {
        
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
            selectedSubFaction={selectedSubFaction} // army.subfaction_chosen
            pointLimit={pointLimit} //army.pointLimit
            removeUnit={removeUnit} //import from app
            usersArmy={usersArmy}  // need [unitId, unitName, unitPts]
            remainingPoints={remainingPoints} //army.pointLimit - army.points
            handleSave={handleSave} //import from app
            />
        </div></>
    )
}