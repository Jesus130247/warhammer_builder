
export default function SubFactionChoice({selectedArmy}) {
    if (selectedArmy) {
        return ( 
            <>
            {Object.keys(selectedArmy.faction_info[3]).map((subFactionName,idx) => {
                return (
                    <option key={idx} value={subFactionName}>{subFactionName}</option>
                )
            })}
            </>
        )
    } 
}