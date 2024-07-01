import { useEffect, useState } from "react"
import UnitRules from "../UnitRules/UnitRules"
import styles from './ArmyCreation.module.css'

export default function ArmyCreation({armyId, addUnit, colour, selectedArmy}) {
    const [unitsInfo, setUnitsInfo] = useState({})
    const [showUnit, setShowUnit] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [selectedUnit, setSelectedUnit] = useState()

    function sortThis(object) {
        return Object.entries(object)
        .sort((a, b) => {
            let first = a[1].unit_data[0];
            let second = b[1].unit_data[0];
        
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
        fetch(`/api/faction/units/pqsl/${armyId}`)
        .then(res=>res.json())
        .then(data=> {
            setisLoading(false)
            setUnitsInfo(data)
        })
        setisLoading(true)
    },[])
    
    function handleClick(e, unitData) {
        showUnit ? showUnit.style.color = '#dadada' : <></>
        e.target.style.color = colour
        setSelectedUnit(unitData)
        setShowUnit(e.target)
    }
    
    if (unitsInfo.length) {
        let characters = unitsInfo.filter(unit => unit.unit_data[1] === 'Characters')
        characters= sortThis(characters)
        let battleline = unitsInfo.filter(unit => unit.unit_data[1] === 'Battleline')
        battleline= sortThis(battleline)
        let dedicatedTransports = unitsInfo.filter(unit => unit.unit_data[1] === 'Dedicated Transports')
        dedicatedTransports= sortThis(dedicatedTransports)
        let other = unitsInfo.filter(unit => unit.unit_data[1] === 'Other')
        other= sortThis(other)
        return (
            <>
            <div className={styles.UnitSelection}>
                <h2 style={{color: colour}}>{selectedArmy.faction_info[0]}</h2>
                {isLoading 
                ? <div>loading...</div>
                : 
                <>
                <h3 style={{color: colour}}>Characters</h3>
                <ul>
                    {characters.map((unitId, idx) => {
                        return( 
                            <li key={idx} id={unitId[1].faction_id} onClick={(event) => handleClick(event, unitId)}>{unitId[1].unit_data[0]}</li>
                        )
                    })}
                </ul>
                <h3 style={{color: colour}}>Battleline</h3>
                <ul> 
                    {battleline.map((unitId, idx) => {
                           return( 
                            <li key={idx} id={unitId[1].faction_id} onClick={(event) => handleClick(event, unitId)}>{unitId[1].unit_data[0]}</li>
                        )
                    })}
                </ul>
                <h3 style={{color: colour}}>Dedicated Transports</h3>
                <ul> 
                    {dedicatedTransports.map((unitId, idx) => {
                         return( 
                            <li key={idx} id={unitId[1].faction_id} onClick={(event) => handleClick(event, unitId)}>{unitId[1].unit_data[0]}</li>
                        )
                    })}
                </ul>
                <h3 style={{color: colour}}>Other</h3>
                <ul> 
                    {other.map((unitId, idx) => {
                      return( 
                            <li key={idx} id={unitId[1].faction_id} onClick={(event) => handleClick(event, unitId)}>{unitId[1].unit_data[0]}</li>
                        )
                    })}
                </ul>
                </>
                }
            </div>
            <>
                {showUnit 
                ? <UnitRules colour={colour} addUnit={addUnit} unitInfo={selectedUnit} />
                : <h2 style={{color: colour}} className={styles.waiting}>waiting on unit to be seleceted</h2>
                }
            </>
            </>
        )
    } else {
        return (<></>)
    }
}