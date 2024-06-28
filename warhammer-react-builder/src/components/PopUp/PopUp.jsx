import ArmyChoices from './ArmyChoices/ArmyChoices'
import styles from './PopUp.module.css'
import SubFactionChoice from './SubFactionChoices/SubFactionChoices'
import { useState } from "react"
import { useEffect } from "react"

export default function PopUp({trigger, setTrigger, setCreate, 
    selectedArmy, setSelectedArmy, setselectedSubFaction, 
    setArmyName, setPointLimit, setColour, armyName }) {
    const [factions, setFactions] = useState() 

    useEffect(() => {
        fetch('/api/factions/psql')
            .then(res=> res.json())
            .then(res => setFactions(res))
    },[])

    function handleSubmit(e) {
        e.preventDefault()
        setTrigger(false)
        setCreate(true)
    }
    function changeArmy(e) {
        let target = e.target.value
        if (target !== 'dontSelectThis') {
            setSelectedArmy(factions[target])
            setColour(factions[target].faction_info[1])
            return
        } else {
            return setSelectedArmy()
        }
    }
    function changeSubFaction(e) {
        if (e.target.value !== 'none') {
            setselectedSubFaction(e.target.value)   
        }
    }

    
    let barWidth = ((armyName.length)/40) *100
    if (barWidth > 100) {barWidth = 100}

    function handlesetArmyName(e) {
        var maxLength = 40;
        if (e.target.value.length >= maxLength) {
            return false;
        }
        setArmyName(e.target.value)
        return true;
    }

    return (trigger ? (
        <div className={styles.popup}>
            <div className={styles.popupLeft}>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Select Faction</label>
                    <select name="" id="" onChange={changeArmy} className={styles.dropdown}>
                        <option value='dontSelectThis'>All Factions</option>
                        <ArmyChoices factions={factions} />
                    </select>
                    <label htmlFor="">Select sub-Faction</label>
                    <select name="" id="" onChange={changeSubFaction} className={styles.dropdown}>
                        <option key="none" value='None'>Select a Faction</option>
                        <SubFactionChoice selectedArmy={selectedArmy}/>
                    </select>
                    <label htmlFor="">Army Name <span className={styles.Span}>- 40 char limit</span></label>

                    <div className={styles.bar} style={{ width: barWidth+"%"}}></div>

                    <textarea onChange={handlesetArmyName} className={styles.Textarea}></textarea>
                    <label htmlFor="">Select points limit</label>
                    <select name="" id="" onChange={(e) => setPointLimit(e.target.value)} className={styles.dropdown}>
                        <option value="1000">1000 pts</option>
                        <option value="1500">1500 pts</option>
                        <option value="2000">2000 pts</option>
                        <option value="2500">2500 pts</option>
                        <option value="3000">3000 pts</option>
                    </select>
                    {selectedArmy ? <button className={styles.createBtn}>Create Army +</button>
                    : <div>Must select an Faction</div>
                    }
                </form>
                <button className={styles.closeBtn} onClick={()=>setTrigger(false)}>Close This popUp</button>
            </div>
            {/* <div className={styles.popupRight}>
            <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Select Faction</label>
                    <div className="content" value={selectedArmy}></div>
                    <label htmlFor="">Select sub-Faction</label>
                    <div className="content" value={selectedSubFaction}></div>
                    <label htmlFor="">your army name?</label>
                    <div className="content" value={armyName}></div>
                    <label htmlFor="">Select points limit</label>
                    <div className="content"></div>
                </form>
                <button className={styles.closeBtn} onClick={()=>setTrigger(false)}>Close This popUp</button>
            </div> */}
        </div>
    ) : "")
}