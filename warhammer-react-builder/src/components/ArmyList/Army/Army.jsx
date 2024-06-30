import { useEffect, useState } from "react"
// import { GetMyArmies } from "../../../utils/user_armies"
import styles from './Army.module.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from '../../../pages/displayArmy';

export default function Army({user}) {
    const [getArmysFromDataBase, setGetArmysFromDataBase] = useState()
    const [viewArmy, setViewArmy] = useState(false)
    const [armyUnits, setArmyUnits] = useState()
    const [usersSelecetedArmy, setUsersSelectedArmy] = useState()
    useEffect(() => {
        fetch(`/api/getMyArmies/${user.id}`)
        .then(res=> res.json())
        .then(res => setGetArmysFromDataBase(res))
    },[])
    async function handleViewArmy(army) {
        await fetch(`/api/faction/units/pqsl/${army.faction_chosen_id}`)
        .then(res=>res.json())
        .then(data=> {
            setArmyUnits(data.filter(unit => army.user_army_array.includes(unit.id)))
        })
        setUsersSelectedArmy(army.user_army_array)
        setViewArmy(true)
    }
    function handleDelete(army) {
        console.log(army.id)
    }
    return ( <>
        {viewArmy ? <>
            {usersSelecetedArmy.map(unitId => {
                let unitRules = armyUnits.filter(id => id.id === unitId)
                return (
                    <div>{unitRules[0].unit_data[0]}</div>
                )
            })}
            <button onClick={() => setViewArmy(false)}>go back</button>
        </> : <>

        {getArmysFromDataBase 
        ? <div className={styles.showArmies}>
            {getArmysFromDataBase.map((army,idx) => {
                return (
                <div className={styles.singleArmy}>
                <button onClick={() => handleDelete(army)}>DELETE THIS ARMY</button>
                    <div>{army.army_name}</div>
                    <div>{army.faction_chosen_id}</div>
                    <div>{army.points}</div>
                    <button onClick={() => handleViewArmy(army)}>VIEW ARMY</button>
                </div>
                )
            })}
        </div> 
        : <div className="army">
            WOW SUCH EMPTY
            <span>EMPTY?? BETTER CREATE AN ARMY ^^</span>
        </div>} </>}
    </>)
}