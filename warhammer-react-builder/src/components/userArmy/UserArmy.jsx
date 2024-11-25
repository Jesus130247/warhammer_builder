import styles from './UserArmy.module.css'
import { useEffect, useState } from 'react'
import EnhancementCheckbox from '../enhancementCheckBox/EnhancementCheckbox'
import PdfButton from '../pdf/Pdf'

import Stratagems from "../stratagems/Stratagems"

export default function UserArmy(
    {
    armyName,selectedSubFaction, usersArmy, selectedEnhancement, selectedArmy,
    pointLimit,remainingPoints,removeUnit, colour, handleSave, subFactionDataEnhancements, handleEnchancement
    }) {
    const [subFactionName, setSubFactionName] = useState('')
    const [selectArmyStratagems, setSelectArmyStratagems] = useState([])
    const [subFactionRule, setSubFactionRule] = useState([])
    const [factionRule, setFactionRule] = useState([])
    const [unitsInfo, setUnitsInfo] = useState([])

    useEffect(() => {
        fetch(`/api/faction/units/pqsl/${selectedArmy.faction_id}`)
        .then(res=>res.json())
        .then(data=> {
            setUnitsInfo(data)
        })
    },[])

    useEffect(() => {
        if (selectedSubFaction) { 
            setFactionRule(Object.entries(selectedArmy.faction_info[2]))
            setSubFactionName(Object.keys(selectedSubFaction)[0])
            setSubFactionRule(Object.entries(selectedSubFaction)[0][1][0])
            setSelectArmyStratagems(selectedArmy.faction_info[4].filter(rules => rules[8] === Object.keys(selectedSubFaction)[0]))
        }
    },[selectedSubFaction])
    return (
    <div className={styles.containerForArmySelection}>
        {armyName 
        ? <h2 style={{color: colour}}>
            <span className={styles.factionRule}>{armyName}</span>
            <button className={styles.saveBtn} onClick={handleSave}>Save Army</button>
        </h2>
        : <h2 style={{color: colour}}>
            <span className={styles.factionRule}>Your Army:</span> 
            <button className={styles.saveBtn} onClick={handleSave} >Save Army</button>
        </h2>
        }


        <p className={styles.showFactionRule}>
        {factionRule.map((rule,id) => {
            return (
                <>
                <div style={{fontWeight: '700', fontSize: '1rem'}}>{rule[0]}</div>
                <br />
                <div dangerouslySetInnerHTML={{__html: rule[1]}} />
                </>
            )
        })}
        </p>
        
        <h3 className={styles.subFactionName}><span style={{borderBottom: '2px dotted #e2e2e2'}}>{subFactionName}</span></h3>

        <p className={styles.showSubFactionRule} dangerouslySetInnerHTML={{__html: subFactionRule}}></p>
        <Stratagems selectArmyStratagems={selectArmyStratagems} colour={colour} />
        <p>Point Limit: {pointLimit} w/ <span style={{fontWeight: 700}}>{remainingPoints}</span> pts remaining</p>
        <EnhancementCheckbox 
        subFactionDataEnhancements={subFactionDataEnhancements} 
        handleEnchancement={handleEnchancement} 
        colour={colour}
        selectedEnhancement={selectedEnhancement}
        />

        <PdfButton 
            colour={colour} //
            armyName={armyName} // army.army_name
            selectedArmy={selectedArmy} // use state for view army selection
            selectedSubFaction={subFactionRule} // army.subfaction_chosen
            pointLimit={pointLimit} //army.pointLimit
            usersArmy={usersArmy}  // need [unitId, unitName, unitPts]
            remainingPoints={remainingPoints} //army.pointLimit - army.points
            subFactionDataEnhancements={subFactionDataEnhancements}
            selectedEnhancement={selectedEnhancement}
            subFactionName={subFactionName}
            selectArmyStratagems={selectArmyStratagems}
            unitsInfo={unitsInfo}
        />
        
        <div style={{fontWeight: 700}}>Your Army So far:</div>

        <ul> 
            {usersArmy.map((unit,idx) => {
                return (
                    <div className={styles.unit} key={idx}>
                        <li className={styles.list}>
                            <span>{unit[1]}</span><br />
                            <span className={styles.pts} style={{color: colour}}>{unit[2]} pts</span>
                        </li>
                        <div className={styles.deleteBtn} value={unit}  id={idx} onClick={removeUnit} style={{color: colour}}>REMOVE</div>
                    </div>
                )
            })}
        </ul>
    </div>
    )
}