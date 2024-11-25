import { useEffect, useState } from "react"
// import { GetMyArmies } from "../utils/user_armies"
import styles from './Army.module.css'
import { DeleteArmy } from "../../utils/user_armies"
import EditArmy from "../editArmy/editArmy"
import { updateArmy } from "../../utils/user_armies"
import zero from '../../assets/images/armyBackground.jpg'
import one from '../../assets/images/40kbackground1.jpg'
import two from '../../assets/images/40kbackground2.jpg'
// import three from '../../assets/images/40kbackground3.jpg'
// import four from '../../assets/images/40kbackground4.jpg'
import five from '../../assets/images/40kbackground5.jpg'
import six from '../../assets/images/40kbackground6.jpg'

export default function Army({user, getArmysFromDataBase, setGetArmysFromDataBase, handleCancel, setViewArmy, viewArmy}) {
    const [armyUnits, setArmyUnits] = useState()
    const [usersSelecetedArmy, setUsersSelectedArmy] = useState()
    const [viewArmyDetails, setViewArmyDetails] = useState([])
    const [usersArmy, setUsersArmy] = useState([])
    const [remainingPoints, setRemainingPoints] = useState()
    const [selectedEnhancement, setSelectedEnhancement] = useState([])
    const [backgroundImages, setBackgorundImages] = useState([zero, one, two, five, six])
    const [backgroundImg, setBackgorundImg] = useState(backgroundImages[Math.floor(Math.random() * backgroundImages.length)])
    const [selectedChapter, setSelectedChapter] = useState('')
    
    function handleUpdate() {
        setGetArmysFromDataBase([])
        updateArmy(Number(viewArmyDetails.id), viewArmyDetails.faction_chosen_id, [viewArmyDetails.subfaction_chosen[0], selectedEnhancement, selectedChapter], viewArmyDetails.army_name,
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
        setRemainingPoints(remainingPoints-pts)
        setUsersArmy([...usersArmy, [unitId, unitName, pts]])
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
        if (army.subfaction_chosen[1] !== null) {
            setSelectedEnhancement(army.subfaction_chosen[1])
        }
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
        if (viewArmyDetails.subfaction_chosen) {
            setSelectedChapter(viewArmyDetails.subfaction_chosen[2])
        }
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
        subFactionInfo={usersSelecetedArmy?.faction_info[3]}
        selectedChapter={selectedChapter}
        setRemainingPoints={setRemainingPoints}
        setSelectedEnhancement={setSelectedEnhancement}
        selectedEnhancement={selectedEnhancement}
        handleEnchancement={handleEnchancement}
        />
        </> : <div className={styles.showArmies} style={{backgroundImage: `url('${backgroundImg}')`}}>
            {getArmysFromDataBase.length !== 0 
            ? 
            <>
            {getArmysFromDataBase.map((army,idx) => {
                return (
                    <div key={idx} className={styles.singleArmy} style={{borderColor:'#' + army.colour, backgroundColor: army.points>army.pointlimit ? 'red': '' }}>
                        <button onClick={() => handleDelete(army)} className={styles.btn}>DELETE THIS ARMY</button>
                        <div>{army.army_name} : </div>
                        <div>{army.faction_chosen_id} : </div>
                        <div>{army.points}/{army.pointlimit}</div>
                        <button onClick={() => handleViewArmy(army)} className={styles.btn}>VIEW ARMY</button>
                    </div>
                    )
                })}
            </> 
            : 
            <div className={styles.singleArmy} style={{borderColor:'white'}}>
                <div>You have no armies created <br />
                Click 'Create an Army +'</div>
            </div>
            }
        </div>}
    </>
    )
}