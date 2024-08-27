import Footer from '../../components/footer/footer'
import Army from '../Army/Army'
import styles from './ArmyList.module.css'

export default function ArmyList({user,getArmysFromDataBase,setGetArmysFromDataBase, handleCancel, removeUnit, addUnit, handleUpdate}) {
    return (
        <section className={styles.armies}>
            <Army 
            getArmysFromDataBase={getArmysFromDataBase}
            setGetArmysFromDataBase={setGetArmysFromDataBase}
            user={user}
            handleCancel={handleCancel}
            removeUnit={removeUnit}
            addUnit={addUnit} 
            handleUpdate={handleUpdate}
            />
            <div className="centerThis">
                <Footer />
            </div>
        </section>
    )
}