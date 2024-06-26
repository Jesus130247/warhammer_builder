import { useState } from "react"
import { useEffect } from "react"

export default function ArmyChoices({}) {
    const [factionIds, setFactionIds] = useState({})

    useEffect(() => {
        fetch('/api/factions')
            .then(res=> res.json())
            .then(res => {
                let IdsAndNames = {}
                for (let factionId in res) {
                    IdsAndNames[factionId] = res[factionId][0]
                }
                setFactionIds(IdsAndNames)
            })
    },[])


    
    return (
        <>        
        {Object.keys(factionIds).map((idx,faction) => {
            return (
                <option key={idx} value={`${idx}|${factionIds[idx]}`}>{factionIds[idx]}</option>
            )
        })}
        </>
    )
}