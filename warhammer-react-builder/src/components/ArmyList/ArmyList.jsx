import Army from './Army/Army'
import styles from './ArmyList.module.css'
export default function ArmyList({user}) {
    return (
        <section className={styles.armies}>
            Your created armies:
            <Army 
            user={user}
            />
        </section>
    )
}