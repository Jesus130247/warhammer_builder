import { useEffect, useState } from "react"
// import { GetMyArmies } from "../../../utils/user_armies"
import styles from './Army.module.css'
import { DeleteArmy } from "../../../utils/user_armies"
import EditArmy from "../../component/editArmy"

export default function Army({user, getArmysFromDataBase, setGetArmysFromDataBase}) {
    const [viewArmy, setViewArmy] = useState(false)
    const [armyUnits, setArmyUnits] = useState()
    const [allArmyUnits, setAllArmyUnits] = useState()
    const [usersSelecetedArmy, setUsersSelectedArmy] = useState()
    const [viewArmyDetails, setViewArmyDetails] = useState([])
    useEffect(() => {
        if (user.id) {
            fetch(`/api/getMyArmies/${Number(user.id)}`)
            .then(res=> res.json())
            .then(res => setGetArmysFromDataBase(res))    
          }
    },[])
    async function handleViewArmy(army) {
        setViewArmyDetails(army)
        if (army) {
            await fetch(`/api/faction/units/pqsl/${army.faction_chosen_id}`)
            .then(res=>res.json())
            .then(data=> {
                setArmyUnits(data.filter(unit => army.user_army_array.includes(unit.id)))
                setAllArmyUnits(data)
            })
        }
        setUsersSelectedArmy(army.user_army_array)
        setViewArmy(true)
    }
    async function handleDelete(army) {
        await DeleteArmy(army.id)
        if (user.id) {
            fetch(`/api/getMyArmies/${Number(user.id)}`)
            .then(res=> res.json())
            .then(res => setGetArmysFromDataBase(res))    
          }
    }
    console.log('here')
    console.log(armyUnits)
    console.log(usersSelecetedArmy)
    console.log(allArmyUnits)
    console.log(viewArmyDetails)
    return ( 
    <>
        {viewArmy ? <>
        {/* <EditArmy 
        addUnit,
        armyId,
        colour,
        selectedArmy={viewArmyDetails},
        handleCancel,
        armyName={viewArmyDetails.army_name}
        selectedSubFaction,
        pointLimit={viewArmyDetails.pointlimit},
        removeUnit
        usersArmy,
        remainingPoints={(viewArmyDetails.pointlimit - viewArmyDetails.points)},
        handleSave
        /> */}
            {usersSelecetedArmy.map(unitId => {
                let unitRules = armyUnits.filter(id => id.id === unitId)
                return (
                    <div>{unitRules[0].unit_data[0]}</div>
                )
            })}
            <button onClick={() => setViewArmy(false)}>go back</button>
        </> : <>

        {getArmysFromDataBase.length !== 0 
        ? 
        <div className={styles.showArmies}>
            {getArmysFromDataBase.map((army,idx) => {
                return (
                <div className={styles.singleArmy}>
                <button onClick={() => handleDelete(army)}>DELETE THIS ARMY</button>
                    <div>{army.army_name}</div>
                    <div>{army.faction_chosen_id}</div>
                    <div>{army.points}/{army.pointlimit}</div>
                    <button onClick={() => handleViewArmy(army)}>VIEW ARMY</button>
                </div>
                )
            })}
        </div> 
        : <div className="army">
            WOW SUCH EMPTY
            <span>EMPTY?? BETTER CREATE AN ARMY ^^</span>
        </div>} 
        </>}
    </>
    )
}