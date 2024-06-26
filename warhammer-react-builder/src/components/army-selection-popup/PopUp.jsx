import ArmyChoices from './ArmyChoices/ArmyChoices'
import styles from './PopUp.module.css'

export default function PopUp({trigger, setTrigger, setCreate, setSelectedArmy}) {
    function handleSubmit(e) {
        e.preventDefault()
        setTrigger(false)
        setCreate(true)
    }
    function handleChange(e) {
        let target = e.target.value.split('|')
        console.log(target);
        setSelectedArmy({ armyId: target[0], army: target[1] })
    }
    return (trigger ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Select Faction</label>
                    <select name="" id="" onChange={handleChange}>
                        <ArmyChoices  />
                    </select>
                    <label htmlFor="">Select sub-Faction</label>
                    <select name="" id="">
                        <option value="">subFactions</option>
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