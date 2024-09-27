import styles from './DemoErrorPopUp.module.css'
export default function DemoErrorPopUp({setUser, setDemoError}) {
    return <>
    <div className={styles.DemoError}>
        Can't save in demo mode. Login to create an Army!
        <button className='btn' onClick={() => {setUser(null); setDemoError(false)}}>Login!</button>
        <button className='btn' onClick={() => setDemoError(false)}>Cancel</button>
    </div>
    </>
}