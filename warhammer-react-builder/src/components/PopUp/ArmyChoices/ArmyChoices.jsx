
export default function ArmyChoices({factions}) {
    return (
        <>        
        {factions.map((faction, idx) => {
            return (
                <option key={idx} value={idx}>{faction.faction_info[0]}</option>
            )
        })}
        </>
    )
}