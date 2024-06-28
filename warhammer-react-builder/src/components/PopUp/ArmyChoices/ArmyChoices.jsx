
export default function ArmyChoices({factions}) {
    return (
        <>        
        {Object.keys(factions).map(idx => {
            return (
                <option key={idx} value={`${idx}|${factions[idx][1]}`}>{factions[idx][0]}</option>
            )
        })}
        </>
    )
}