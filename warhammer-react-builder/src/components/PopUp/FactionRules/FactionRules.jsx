import styles from './factionRules.module.css'
import Stratagems from '../../stratagems/Stratagems'
import { useState, useEffect } from 'react'

export default function FactionRules({selectedArmy, selectedSubFaction, colour}) {
    const [selectArmyStratagems, setSelectArmyStratagems] = useState()
    const [subFactionName, setSubFactionName] = useState()
    const [subFactionRule, setSubFactionRule] = useState()
    const [factionData, setFactionData] = useState()
    const [showRules, setShowRules] = useState([false, false])
    
    useEffect(() => {
        if (selectedArmy) {
            setFactionData(Object.entries(selectedArmy.faction_info[2]).map(data => data))
            setShowRules([true, false])
        }
        if (selectedSubFaction) {
            setSubFactionName(Object.keys(selectedSubFaction)[0])
            setSubFactionRule(Object.entries(selectedSubFaction)[0][1][0])
            setSelectArmyStratagems(selectedArmy.faction_info[4].filter(rules => rules[8] === Object.keys(selectedSubFaction)[0]))
            setShowRules([false, true])
        } 
    }, [selectedArmy,selectedSubFaction])
    if (showRules[0]) {
        return (
            <>
            <div className={styles.factionName}>{factionData[0][0]}:</div><span className={styles.data} dangerouslySetInnerHTML={{__html : factionData[0][1]}}></span>
            </>
        )

    } else if (showRules[1]) {
        return (
            <>
            <div className={styles.factionName}>{factionData[0][0]}: </div><span className={styles.data} dangerouslySetInnerHTML={{__html : factionData[0][1]}}></span>
            <div className={styles.factionName}>{subFactionName}:</div> <span  className={styles.data}dangerouslySetInnerHTML={{__html : subFactionRule}}></span>
            <br />
            <Stratagems colour={colour} selectArmyStratagems={selectArmyStratagems}/>
            </>
        )
    } else {
        return (<>Select a Faction</>)
    }
}