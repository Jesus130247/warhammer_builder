import ArmyChoices from './ArmyChoices/ArmyChoices'
import styles from './PopUp.module.css'
import SubFactionChoice from './SubFactionChoices/SubFactionChoices'
import { useState } from "react"
import { useEffect } from "react"

export default function PopUp({trigger, setTrigger, setCreate, selectedArmy, setSelectedArmy}) {
    const [factions, setFactions] = useState()

    useEffect(() => {
        fetch('/api/factions')
            .then(res=> res.json())
            .then(res => setFactions(res))
    },[])

    function handleSubmit(e) {
        e.preventDefault()
        setTrigger(false)
        setCreate(true)
    }
    function handleChange(e) {
        let target = e.target.value
        if (target !== 'dontSelectThis') {
            return setSelectedArmy({factionId: target, factionInfo: factions[target]})
        } else {
            return setSelectedArmy()
        }

    }
    return (trigger ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Select Faction</label>
                    <select name="" id="" onChange={handleChange}>
                        <option value='dontSelectThis'>All Factions</option>
                        <ArmyChoices factions={factions} />
                    </select>
                    <label htmlFor="">Select sub-Faction</label>
                    <select name="" id="">
                        <SubFactionChoice factions={factions} selectedArmy={selectedArmy} />
                    </select>
                    <label htmlFor="">your army name?</label>
                    <textarea></textarea>
                    <label htmlFor="">Select points limit</label>
                    <select name="" id="">
                        <option value="">2000 pts</option>
                    </select>
                    <button>Create Army +</button>
                </form>
                <button className={styles.closeBtn} onClick={()=>setTrigger(false)}>Close This popUp</button>
            </div>
        </div>
    ) : "")
}