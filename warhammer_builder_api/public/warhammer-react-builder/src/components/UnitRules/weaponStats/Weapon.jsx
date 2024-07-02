import styles from './Weapon.module.css'

export default function Weapon({weaponStats, idx, colour}) {
    if (idx%2) {
        return (
            <tr key={idx} className={styles.rowOdd}>
                <td className={styles.specialRules}>{weaponStats[0]}
                    <span>    
                        {weaponStats[1].split(',').map((rule,idx) => {
                            return (
                            <span key={idx} dangerouslySetInnerHTML={{__html: rule}}></span>
                            )
                        })}
                    </span>
                </td>
                <td>{weaponStats[2]}</td>
                <td>{weaponStats[4]}</td>
                <td>{weaponStats[5]}</td>
                <td>{weaponStats[6]}</td>
                <td>{weaponStats[7]}</td>
                <td>{weaponStats[8]}</td>
            </tr>
        )
    } else {
        return (
            <tr key={idx} className={styles.rowEven}>
                <td className={styles.specialRules}>{weaponStats[0]}
                {weaponStats[1].split(',').map((rule,idx) => {
                    return (
                    <span key={idx} dangerouslySetInnerHTML={{__html: rule}}></span>
                    )
                })}
                </td>
                <td>{weaponStats[2]}</td>
                <td>{weaponStats[4]}</td>
                <td>{weaponStats[5]}</td>
                <td>{weaponStats[6]}</td>
                <td>{weaponStats[7]}</td>
                <td>{weaponStats[8]}</td>
            </tr>
        )  
    }
}