import styles from './factionRules.module.css'

export default function FactionRules({faction, subFaction}) {
    let subFactionName
    let subFactionRule
    if (subFaction && faction) {
        let factionData = Object.entries(faction.faction_info[2]).map(data => data)
        subFactionName = Object.keys(subFaction)[0]
        subFactionRule = Object.entries(subFaction)[0][1][0]
        return (
            <>
            <div className={styles.factionName}>{factionData[0][0]}: </div><span className={styles.data} dangerouslySetInnerHTML={{__html : factionData[0][1]}}></span>
            <div className={styles.factionName}>{subFactionName}:</div> <span  className={styles.data}dangerouslySetInnerHTML={{__html : subFactionRule}}></span>
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