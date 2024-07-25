import Army from './Army/Army'
import styles from './ArmyList.module.css'
import zero from '../../assets/images/armyBackground.jpg'
import one from '../../assets/images/40kbackground1.jpg'
import two from '../../assets/images/40kbackground2.jpg'
import three from '../../assets/images/40kbackground3.jpg'
import four from '../../assets/images/40kbackground4.jpg'
import five from '../../assets/images/40kbackground5.jpg'
import six from '../../assets/images/40kbackground6.jpg'
import { useState } from 'react'

export default function ArmyList({user,getArmysFromDataBase,setGetArmysFromDataBase, handleCancel, removeUnit, addUnit, handleUpdate}) {
    const [backgroundImages, setBackgorundImages] = useState([zero, one, two, three, four, five, six])
    const [backgroundImg, setBackgorundImg] = useState(backgroundImages[Math.floor(Math.random() * backgroundImages.length)])
    console.log(backgroundImages)
    return (
        <section className={styles.armies} style={{backgroundImage: `url('${backgroundImg}')`}}>
            Your created armies:
            <Army 
            getArmysFromDataBase={getArmysFromDataBase}
            setGetArmysFromDataBase={setGetArmysFromDataBase}
            user={user}
            handleCancel={handleCancel}
            removeUnit={removeUnit}
            addUnit={addUnit} 
            handleUpdate={handleUpdate}
            />
        </section>
    )
}