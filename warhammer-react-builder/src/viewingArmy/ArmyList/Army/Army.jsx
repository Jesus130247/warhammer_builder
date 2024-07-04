import { useEffect, useState } from "react"
// import { GetMyArmies } from "../../../utils/user_armies"
import styles from './Army.module.css'
import { DeleteArmy } from "../../../utils/user_armies"
import EditArmy from "../../component/editArmy"
import { updateArmy } from "../../../utils/user_armies"

export default function Army({user, getArmysFromDataBase, setGetArmysFromDataBase, handleCancel}) {
    const [viewArmy, setViewArmy] = useState(false)
    const [armyUnits, setArmyUnits] = useState()
    const [usersSelecetedArmy, setUsersSelectedArmy] = useState()
    const [viewArmyDetails, setViewArmyDetails] = useState([])
    const [usersArmy, setUsersArmy] = useState([])
    const [remainingPoints, setRemainingPoints] = useState()
    const [selectedEnhancement, setSelectedEnhancement] = useState([])
    function handleUpdate() {
        setGetArmysFromDataBase([])
        updateArmy(Number(viewArmyDetails.id), viewArmyDetails.faction_chosen_id, [viewArmyDetails.subfaction_chosen[0], selectedEnhancement], viewArmyDetails.army_name,
        Number(viewArmyDetails.pointlimit - remainingPoints), Number(viewArmyDetails.pointlimit), viewArmyDetails.colour, usersArmy )
        if (user) {
            fetch(`/api/getMyArmies/${Number(user.id)}`)
            .then(res=> res.json())
            .then(res => setGetArmysFromDataBase(res))    
        }
        handleCancel()
        location.reload()
      }

    function addUnit(unitId, pts, unitName) {
        if (remainingPoints-pts>=0 ) {
            setRemainingPoints(remainingPoints-pts)
            setUsersArmy([...usersArmy, [unitId, unitName, pts]])
        }
    }
    
    function removeUnit(e) {
        let pts
        setUsersArmy(usersArmy.filter((unit,idx) => {
            if (idx === Number(e.target.id)) {
                pts = Number(unit[2])
            }
            return idx !== Number(e.target.id)
        }))
        setRemainingPoints(remainingPoints+pts)
    }

    useEffect(() => {
        if (user.id) {
            fetch(`/api/getMyArmies/${Number(user.id)}`)
            .then(res=> res.json())
            .then(res => setGetArmysFromDataBase(res))    
          }
    },[])
    async function handleViewArmy(army) {
        setViewArmyDetails(army)
        setSelectedEnhancement(army.subfaction_chosen[1])
        if (army) {
            await fetch(`/api/faction/units/pqsl/${army.faction_chosen_id}`)
            .then(res=>res.json())
            .then(data=> {
                let units = []
                setUsersArmy(army.user_army_array)
                army.user_army_array.forEach(unitId => {
                    let unit =  data.filter(unit =>  unitId[0] === unit.id)
                    units.push(unit)
                })
                setArmyUnits(units)
            })
            await fetch(`/api/factions/psql`)
            .then(res=> res.json())
            .then(res => setUsersSelectedArmy((res.filter(setArmy => setArmy.faction_id === army.faction_chosen_id))[0]))    
        }
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
    useEffect(() => {
        setRemainingPoints(viewArmyDetails.pointlimit - viewArmyDetails.points)
    }, [viewArmyDetails])

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
    <>
        {viewArmy ? <>
        <EditArmy 
        colour={'#' + viewArmyDetails.colour}
        selectedArmy={usersSelecetedArmy}
        armyName={viewArmyDetails.army_name}
        pointLimit={viewArmyDetails.pointlimit}
        remainingPoints={remainingPoints}
        armyId={viewArmyDetails.faction_chosen_id}
        handleSave={handleUpdate}
        handleCancel={handleCancel}
        selectedSubFaction={viewArmyDetails.subfaction_chosen}
        addUnit={addUnit}
        removeUnit={removeUnit}
        usersArmy={usersArmy}
        subFactionInfo={usersSelecetedArmy.faction_info[3]}

        setRemainingPoints={setRemainingPoints}
        setSelectedEnhancement={setSelectedEnhancement}
        selectedEnhancement={selectedEnhancement}
        handleEnchancement={handleEnchancement}
        />
        </> : <>

        {getArmysFromDataBase.length !== 0 
        ? 
        <div className={styles.showArmies}>
            {getArmysFromDataBase.map((army,idx) => {
                return (
                <div key={idx} className={styles.singleArmy} style={{borderColor:'#' + army.colour}}>
                <button onClick={() => handleDelete(army)} className={styles.btn}>DELETE THIS ARMY</button>
                    <div>{army.army_name}</div>
                    <div>{army.faction_chosen_id}</div>
                    <div>{army.points}/{army.pointlimit}</div>
                    <button onClick={() => handleViewArmy(army)} className={styles.btn}>VIEW ARMY</button>
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