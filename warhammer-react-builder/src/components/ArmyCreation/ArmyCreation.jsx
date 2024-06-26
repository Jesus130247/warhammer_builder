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
    let characters = Object.entries(unitsInfo).filter(log => log[1][1] === 'Characters')
    let battleline = Object.entries(unitsInfo).filter(log => log[1][1] === 'Battleline')
    let dedicatedTransports = Object.entries(unitsInfo).filter(log => log[1][1] === 'Dedicated Transports')
    let other = Object.entries(unitsInfo).filter(log => log[1][1] === 'Other')
    return (
        <>
        <div className={styles.UnitSelection}>
            <h3>Units that belong to selected army</h3>
            {isLoading 
            ? <div>loading...</div>
            : 
            <>
            <h3>Characters</h3>
            <ul>
                {characters.map((unitId, idx) => {
                    return( 
                        <li key={idx} id={unitId[0]} onClick={(event) => handleClick(event,unitsInfo[unitId[0]])}>{unitId[1][0]}</li>
                    )
                })}
            </ul>
            <h3>Battleline</h3>
            <ul> 
                {battleline.map((unitId, idx) => {
                    return( 
                        <li key={idx} id={unitId[0]} onClick={(event) => handleClick(event,unitsInfo[unitId[0]])}>{unitId[1][0]}</li>
                    )
                })}
            </ul>
            <h3>Dedicated Transports</h3>
            <ul> 
                {dedicatedTransports.map((unitId, idx) => {
                    return( 
                        <li key={idx} id={unitId[0]} onClick={(event) => handleClick(event,unitsInfo[unitId[0]])}>{unitId[1][0]}</li>
                    )
                })}
            </ul>
            <h3>Other</h3>
            <ul> 
                {other.map((unitId, idx) => {
                    return( 
                        <li key={idx} id={unitId[0]} onClick={(event) => handleClick(event,unitsInfo[unitId[0]])}>{unitId[1][0]}</li>
                    )
                })}
            </ul>
            </>
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