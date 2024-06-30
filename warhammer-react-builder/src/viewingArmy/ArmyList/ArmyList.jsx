import Army from './Army/Army'
import styles from './ArmyList.module.css'
export default function ArmyList({user,getArmysFromDataBase,setGetArmysFromDataBase}) {
    return (
        <section className={styles.armies}>
            Your created armies:
            <Army 
            getArmysFromDataBase={getArmysFromDataBase}
            setGetArmysFromDataBase={setGetArmysFromDataBase}
            user={user}
            />
        </section>
    )
}