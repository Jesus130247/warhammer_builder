
export default function ArmyChoices({factions}) {
    function sortThis(object) {
        return Object.entries(object)
        .sort((a, b) => {
            let first = a[1].faction_info[0];
            let second = b[1].faction_info[0];
        
            if (first < second) {
            return -1;
            }
            if (first > second) {
            return 1;
            }
            return 0;
        })
    }
    let sortedFactions = sortThis(factions)
    return (
        <>        
        {sortedFactions.filter(faction => faction[1].faction_id !== 'UN').map((faction, idx) => {
            return (
                <option key={idx} value={faction[0]}>{faction[1].faction_info[0]}</option>
            )
        })}
        </>
    )
}