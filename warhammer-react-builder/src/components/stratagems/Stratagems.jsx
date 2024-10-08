import { useState, useEffect } from "react"
import styles from './Stratagems.module.css'

export default function Stratagems({selectArmyStratagems, colour}) {
    const [stratagems, setStratagems] = useState([])
    useEffect(() => {
        if (selectArmyStratagems) {
            setStratagems(selectArmyStratagems)
        }   
    }, [selectArmyStratagems])
    return(
        <>
        <h3 className={styles.StratHov} style={{color: colour}}>View Stratagems!</h3>
        <div className={styles.stratagems}>{stratagems.map(stratagem => {
            return(
                <div className={styles.stratagem}>
                    <h3 style={{color: colour}}>{stratagem[2]} <br /> <span style={{color: 'white'}}>{stratagem[4]} CP</span></h3>
                    <p>{stratagem[3]}</p>
                    {/* <p>{stratagem[5]}</p> */}
                    <div style={{color: 'white'}}dangerouslySetInnerHTML={{__html: stratagem[9]}}></div>
                </div>
            )
        })}</div>
        </>
    )
}