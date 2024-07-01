export default function EditArmy(addUnit,armyId,colour,selectedArmy,handleCancel,armyName,selectedSubFaction,pointLimit,removeUnit,usersArmy,remainingPoints,handleSave) {
    return (
        <>
        <div className={styles.ArmySelection}>  
            <div className={styles.containerForUnits}>
                <ArmyCreation 
                addUnit={addUnit} // import from App
                armyId={selectedArmy.faction_id} // use state for view army selection
                colour={colour} // use state for view army selection
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
            usersArmy={usersArmy} 
            remainingPoints={remainingPoints} //army.pointLimit - army.points
            handleSave={handleSave} //import from app
            />
        </div></>
    )
}