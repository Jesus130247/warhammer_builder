import styles from '../userArmy/UserArmy.module.css';

export default function EnhancementCheckbox({subFactionDataEnhancements, handleEnchancement, colour, selectedEnhancement}) {
    const maxEnhancements = 3; // Define the maximum allowed enhancements
    const enhancementCount = selectedEnhancement ? Object.keys(selectedEnhancement).length : 0; // Count selected enhancements

    return (
        <>
        <div className={styles.enhanceRules}>- Only a non <span style={{fontWeight:'700'}}>Epic Hero</span> <span style={{fontWeight:'700'}}>Character</span> Model can take an enhancement.</div>
        <div className={styles.enhanceRules}>- 1 per <span style={{fontWeight:'700'}}>Character</span> Model.</div>
        <div style={{fontWeight:'700', paddingTop: '10px'}}>Enhancements:</div>
        {subFactionDataEnhancements.filter(item => Array.isArray(item)).map(enhancement => {
            if (selectedEnhancement !== undefined) {
                if (selectedEnhancement) {
                    let existingEnhancements = Object.entries(selectedEnhancement).map(enhancement => Object.keys(enhancement[1])[0]);
                    if (existingEnhancements.includes(enhancement[0])) {
                        return (
                            <div className={styles.checkBox} key={enhancement[2]}>
                                <input type="checkbox" 
                                    id={enhancement[2]} 
                                    name={enhancement[0]} 
                                    pts={enhancement[2]} 
                                    onChange={handleEnchancement} 
                                    checked
                                    style={{backgroundColor : colour}}
                                    disabled={enhancementCount >= maxEnhancements && !existingEnhancements.includes(enhancement[0])}
                                />
                                <div className={styles.enhanceName}>
                                    <span style={{borderBottom: '2px dotted #e2e2e2'}}>{enhancement[0]}</span> - <span className={styles.pts} style={{color: colour}}>{enhancement[2]}pts</span>
                                </div>
                                <p dangerouslySetInnerHTML={{__html: enhancement[1]}} className={styles.enhanceDes}></p>
                            </div>
                        )
                    }
                }
            }
            return (
                <div className={styles.checkBox} key={enhancement[2]}>
                    <input 
                        type="checkbox" 
                        id={enhancement[2]} 
                        name={enhancement[0]} 
                        pts={enhancement[2]} 
                        onChange={handleEnchancement} 
                        disabled={enhancementCount >= maxEnhancements}
                        style={{
                            borderColor: enhancementCount >= maxEnhancements ? 'red' : ''
                        }}
                    />
                    <div className={styles.enhanceName}>
                        <span style={{borderBottom: '2px dotted #e2e2e2'}}>{enhancement[0]}</span> - <span className={styles.pts} style={{color: colour}}>{enhancement[2]}pts</span>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: enhancement[1]}} className={styles.enhanceDes}></p>
                </div>
            )
        })}
        </>
    )
}
