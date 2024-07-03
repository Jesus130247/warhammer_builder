import styles from '../UserArmy.module.css'
export default function EnhancementCheckbox({subFactionDataEnhancements, handleEnchancement, colour, selectedEnhancement}) {
    return (
        <>
        {subFactionDataEnhancements.map(enhancement => {
            if (selectedEnhancement.length) {
                let existingEnhancements = Object.entries(selectedEnhancement).map(enhancement => Object.keys(enhancement[1])[0])
                if (existingEnhancements.includes(enhancement[0])) {
                    return (
                        <div className={styles.checkBox}>
                            <input type="checkbox" 
                                id={enhancement[2]} 
                                name={enhancement[0]} 
                                pts={enhancement[2]} 
                                onChange={handleEnchancement} 
                                checked
                                style={{backgroundColor : colour}}
                            />
                        <div className={styles.enhanceName}><span style={{borderBottom: '2px dotted #e2e2e2'}}>{enhancement[0]}</span> - <span style={{color: colour}}>{enhancement[2]}pts</span></div>
                        <p dangerouslySetInnerHTML={{__html:enhancement[1]}} className={styles.enhanceDes}></p>
                        </div>
                    )
                }
            }
            return (
                <div className={styles.checkBox}>
                <input type="checkbox" id={enhancement[2]} name={enhancement[0]} pts={enhancement[2]} onChange={handleEnchancement} />
                <div className={styles.enhanceName}><span style={{borderBottom: '2px dotted #e2e2e2'}}>{enhancement[0]}</span> - <span style={{color: colour}}>{enhancement[2]}pts</span></div>
                <p dangerouslySetInnerHTML={{__html:enhancement[1]}} className={styles.enhanceDes}></p>
                </div>
            )
        })}
        </>
    )
}