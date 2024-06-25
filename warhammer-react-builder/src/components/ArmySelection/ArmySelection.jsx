import { useState } from "react"
import { useEffect } from "react"
import ArmyCreation from "../ArmyCreation/ArmyCreation"
import styles from './ArmySelection.module.css'

export default function ArmySelection() {
    const [factionIds, setFactionIds] = useState({})
    const [army, setArmy] = useState({ selected:false, armyId:''})
    const [selectedArmyState, setSelectedArmyState] = useState(false)
    const [armyPoints ,setArmyPoints] = useState(2000)
    const [isLoading, setisLoading] = useState(true)

    function addUnit(pts) {
        setArmyPoints(armyPoints-pts)
    }

    useEffect(() => {
        fetch('/api/factions')
            .then(res=> res.json())
            .then(res => {
                let IdsAndNames = {}
                for (let factionId in res) {
                    IdsAndNames[factionId] = res[factionId][0]
                }
                setFactionIds(IdsAndNames)
                setisLoading(false)
            })
        setisLoading(true)
    },[])
    function selectedArmy(e) {
        selectedArmyState ? selectedArmyState.style.color = 'black' : <></>
        e.target.style.color = 'red'
        setSelectedArmyState(e.target)
        setArmy({ selected:true, armyId: e.target.id, army: e.target.innerText })
    }
    return (
        <div className={styles.ArmySelection}>  
            <div className="container-for-army-selection">
                <h3>Select Which army you will be playing</h3>
                <ul>
                    {Object.keys(factionIds).map((idx,faction) => {
                        return (
                            <li key={idx} id={idx} onClick={selectedArmy}>{factionIds[idx]}</li>
                        )
                    })}
                    <p>{army.army} w/ {armyPoints} pts remaining</p>
                </ul>
            </div>
            <div className={styles.containerForUnits}>
                {isLoading 
                ? <div>laoding...</div>
                : army.selected && <ArmyCreation addUnit={addUnit} armyId={army.armyId} armyName={army.army}/> 
                }                 
            </div>
        </div>
    )
}