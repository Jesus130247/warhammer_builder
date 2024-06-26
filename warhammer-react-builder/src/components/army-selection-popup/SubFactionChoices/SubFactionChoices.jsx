
export default function SubFactionChoice({factions, selectedArmy}) {
    if (selectedArmy) {
        return ( 
            <>
            {Object.keys(selectedArmy.factionInfo[2]).map((subFactionName,idx) => {
                if (subFactionName !== 'Detachments') {
                    return (
                        <option key={idx}>{subFactionName}</option>
                    )
                }
            })}
            </>
        )
    } else {
        return (
            <option key="None">No Faction Selected</option>
        )
    }
}