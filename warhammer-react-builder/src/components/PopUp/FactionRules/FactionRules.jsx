import styles from './factionRules.module.css'

export default function FactionRules({faction, subFaction}) {
    if (subFaction && faction) {
        let factionData = Object.entries(faction.faction_info[2]).map(data => data)
        let subFactionData = Object.entries(faction.faction_info[3]).filter(subfactions => subfactions[0] === subFaction)
        return (
            <>
            <div className={styles.factionName}>{factionData[0][0]}: </div><span className={styles.data} dangerouslySetInnerHTML={{__html : factionData[0][1]}}></span>
            <div className={styles.factionName}>{subFactionData[0][0]}:</div> <span  className={styles.data}dangerouslySetInnerHTML={{__html : subFactionData[0][1][0]}}></span>
            </>
        )
    } else if (faction) {
        let factionData = Object.entries(faction.faction_info[2]).map(data => data)
        return (
            <>
            <div className={styles.factionName}>{factionData[0][0]}:</div><span  dangerouslySetInnerHTML={{__html : factionData[0][1]}}></span>
            </>
        )
    } 
    else {
        return (<>Select a Faction</>)
    }
}