import Army from './Army/Army'
import styles from './ArmyList.module.css'
export default function ArmyList() {
    return (
        <section className={styles.armies}>
            Your created armies:
            <Army />
        </section>
    )
}