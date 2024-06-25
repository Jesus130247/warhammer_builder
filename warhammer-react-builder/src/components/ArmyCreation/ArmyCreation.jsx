import { useEffect, useState } from "react"
import UnitRules from "../UnitRules/UnitRules"
import styles from './ArmyCreation.module.css'

export default function ArmyCreation({armyId, armyName, addUnit}) {
    const [unitsInfo, setUnitsInfo] = useState({})
    const [unitInfoState, setUnitInfoState] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [selectedUnitState, setSelectedUnitState] = useState(false)

    useEffect(() => {
        fetch(`/api/faction/units/${armyId}`)
        .then(res=>res.json())
        .then(data=> {
            setisLoading(false)
            setUnitsInfo(data)
        })
        setisLoading(true)
    },[armyId])
    function handleClick(e, unitInfo) {
        selectedUnitState ? selectedUnitState.style.color = 'black' : <></>
        e.target.style.color = 'red'
        setSelectedUnitState(e.target)
        setUnitInfoState(unitInfo)
    }

    return (
        <>
        <div className={styles.UnitSelection}>
            <h3>Units that belong to selected army</h3>
            {isLoading 
            ? <div>loading...</div>
            : 
            <ul>
                {Object.keys(unitsInfo).map((unitId,unit) => {
                    return(
                        <li key={unitId} id={unitId} onClick={(event) => handleClick(event,unitsInfo[unitId])}> {unitsInfo[unitId][0]} </li>
                    )
                })}
            </ul>
            }
        </div>
        <div className='showUnit'>
            {selectedUnitState 
            ? <UnitRules addUnit={addUnit} unitInfo={unitInfoState} />
            : <h3>waiting on unit to be seleceted</h3>
            }
        </div>
        </>
    )
}