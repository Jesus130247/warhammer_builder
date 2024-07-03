import ArmyChoices from './ArmyChoices/ArmyChoices'
import FactionRules from './FactionRules/FactionRules'
import styles from './PopUp.module.css'
import SubFactionChoice from './SubFactionChoices/SubFactionChoices'
import { useState } from "react"
import { useEffect } from "react"

export default function PopUp({trigger, setTrigger, setCreate, 
    selectedArmy, setSelectedArmy, setselectedSubFaction, setRemainingPoints,
    setArmyName, setPointLimit, setColour, armyName, selectedSubFaction }) {
    const [factions, setFactions] = useState() 
    const [subFactionSelectedIndex, setSubFactionSelectedIndex] = useState('')

    useEffect(() => {
        fetch('/api/factions/psql')
            .then(res=> res.json())
            .then(res => setFactions(res))
    },[])

    function handleClose () {
        setTrigger(false)
        setSelectedArmy()
        setselectedSubFaction()
        setArmyName('')
        setPointLimit(1000)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setTrigger(false)
        setCreate(true)
    }
    function changeArmy(e) {
        if (subFactionSelectedIndex) {
            subFactionSelectedIndex.selectedIndex=0 // resets the form-> subfaction select
        }
        let target = e.target.value
        if (target !== 'dontSelectThis') {
            setselectedSubFaction()
            setSelectedArmy(factions[target])
            setColour(factions[target].faction_info[1])
            return
        } else {
            setselectedSubFaction()
            setSelectedArmy()
            return
        }
    }
    function changeSubFaction(e) {
        setSubFactionSelectedIndex(e.target)  
        if (selectedArmy) {
            if (e.target.value !== 'None') {
                setselectedSubFaction({[e.target.value]:selectedArmy.faction_info[3][e.target.value]})
            } else {
                setselectedSubFaction()  
            }
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

    return (trigger ? ( <>
    <div className={styles.popupLeft}>
        <div className={styles.popupLeftInner}>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Select Faction</label>
                <select name="factions" id="" onChange={changeArmy} className={styles.dropdown}>
                    <option value='dontSelectThis'>All Factions</option>
                    <ArmyChoices factions={factions} />
                </select>
                <label htmlFor="">Select sub-Faction</label>
                <select name="subFactions" id="" onChange={changeSubFaction} className={styles.dropdown}>
                    <option key="none" value='None'>Select a sub-Faction</option>
                    <SubFactionChoice selectedArmy={selectedArmy}/>
                </select>
                <label htmlFor="">Army Name <span className={styles.Span}>- 40 char limit</span></label>
                <div className={styles.bar} style={{ width: barWidth+"%"}}></div>
                <textarea onChange={handlesetArmyName} className={styles.Textarea}></textarea>
                <label htmlFor="">Select points limit</label>
                <select name="" id="" onChange={(e) => {setPointLimit(e.target.value); setRemainingPoints(e.target.value)}} className={styles.dropdown}>
                    <option value="1000">1000 pts</option>
                    <option value="1500">1500 pts</option>
                    <option value="2000">2000 pts</option>
                    <option value="2500">2500 pts</option>
                    <option value="3000">3000 pts</option>
                </select>
                {selectedArmy && selectedSubFaction ? <button className={styles.createBtn}>Create Army +</button>
                 : <div>Must select an Faction</div>}
            </form>
        </div>
        <button className={styles.closeBtn} onClick={handleClose}>X</button>
        <div className={styles.popupRight}>
            <div className={styles.popupRightInner}>
                <FactionRules faction={selectedArmy} subFaction={selectedSubFaction}/>
            </div>
        </div>
    </div>
    </>
    ) : "")
}