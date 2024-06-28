import { useEffect, useState } from "react"
import UnitRules from "../UnitRules/UnitRules"
import styles from './ArmyCreation.module.css'

export default function ArmyCreation({armyId, armyName, addUnit, colour}) {
    const [unitsInfo, setUnitsInfo] = useState({})
    const [unitInfoState, setUnitInfoState] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [selectedUnitState, setSelectedUnitState] = useState(false)

    function sortThis(object) {
        return Object.entries(object)
        .sort((a, b) => {
            let first = a[1][1][0];
            let second = b[1][1][0];
        
            if (first < second) {
            return -1;
            }
            if (first > second) {
            return 1;
            }
            return 0;
        })
    }
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
        selectedUnitState ? selectedUnitState.style.color = '#dadada' : <></>
        e.target.style.color = colour
        setSelectedUnitState(e.target)
        setUnitInfoState(unitInfo)
    }
    let characters = Object.entries(unitsInfo).filter(unit => unit[1][1] === 'Characters')
    characters= sortThis(characters)
    let battleline = Object.entries(unitsInfo).filter(unit => unit[1][1] === 'Battleline')
    battleline= sortThis(battleline)
    let dedicatedTransports = Object.entries(unitsInfo).filter(unit => unit[1][1] === 'Dedicated Transports')
    dedicatedTransports= sortThis(dedicatedTransports)
    let other = Object.entries(unitsInfo).filter(unit => unit[1][1] === 'Other')
    other= sortThis(other)
    return (
        <>
        <div className={styles.UnitSelection}>
            <h3 >Units that belong to selected army</h3>
            {isLoading 
            ? <div>loading...</div>
            : 
            <>
            <h3 style={{color: colour}}>Characters</h3>
            <ul>
                {characters.map((unitId, idx) => {
                    return( 
                        <li key={idx} id={unitId[1][0]} onClick={(event) => handleClick(event,unitsInfo[unitId[1][0]])}>{unitId[1][1][0]}</li>
                    )
                })}
            </ul>
            <h3 style={{color: colour}}>Battleline</h3>
            <ul> 
                {battleline.map((unitId, idx) => {
                    return( 
                        <li key={idx} id={unitId[1][0]} onClick={(event) => handleClick(event,unitsInfo[unitId[1][0]])}>{unitId[1][1][0]}</li>
                    )
                })}
            </ul>
            <h3 style={{color: colour}}>Dedicated Transports</h3>
            <ul> 
                {dedicatedTransports.map((unitId, idx) => {
                    return( 
                        <li key={idx} id={unitId[1][0]} onClick={(event) => handleClick(event,unitsInfo[unitId[1][0]])}>{unitId[1][1][0]}</li>
                    )
                })}
            </ul>
            <h3 style={{color: colour}}>Other</h3>
            <ul> 
                {other.map((unitId, idx) => {
                    return( 
                        <li key={idx} id={unitId[1][0]} onClick={(event) => handleClick(event,unitsInfo[unitId[1][0]])}>{unitId[1][1][0]}</li>
                    )
                })}
            </ul>
            </>
            }
        </div>
        <>
            {selectedUnitState 
            ? <UnitRules colour={colour} addUnit={addUnit} unitInfo={unitInfoState} />
            : <h3>waiting on unit to be seleceted</h3>
            }
        </>
        </>
    )
}