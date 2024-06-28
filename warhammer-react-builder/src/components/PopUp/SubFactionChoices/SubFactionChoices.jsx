
export default function SubFactionChoice({selectedArmy}) {
    if (selectedArmy) {
        return ( 
            <>
            {Object.keys(selectedArmy.factionInfo[3]).map((subFactionName,idx) => {
                if (subFactionName !== 'Detachments') {
                    return (
                        <option key={idx} value={subFactionName}>{subFactionName}</option>
                    )
                }
            })}
            </>
        )
    } 
}