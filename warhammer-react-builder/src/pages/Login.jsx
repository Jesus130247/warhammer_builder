import { useState } from "react"
import { signUp, login } from "../utils/auth_api"
import styles from './Login.module.css'

export default function Login(props) {
    const [formData, setFormData] = useState({ email:'', password:''})
    const [newUser, setNewUser] = useState({ email:'', password:''})
    const [logging, setLogging] = useState(true)
    const [message, setMessage] = useState(null)

    async function tryLogin(e) {
        e.preventDefault()
        try {
            let token = await login(formData)
            localStorage.setItem('token', token)
            props.onLogin(formData, true)
        } catch (err) {
            console.log(err)
            setMessage('ERROR: Invalid username or password')
        }
    }

    async function trySignUp(e) {
        e.preventDefault()
        setMessage('Signed up')
        setLogging(true)
        await signUp(newUser)
            .catch(err => {
                console.log(err)
                setMessage('ERROR: Username already exists')
                setLogging(false)
            })
    }

    function handleChangeLogin(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }
    function handleChangeSignUp(e) {
        setNewUser({...newUser, [e.target.name]: e.target.value})
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    function handleSwitch() {
        setLogging(!logging)
        setMessage(null)
    }
    return (
        <section className={styles.login}>
            <h1>Prepare for Battle</h1>
            {logging ? <>
            <h2>Login</h2>
            <div style={{color:"red", fontSize:'1.15rem', fontWeight:'700'}}>{message}</div>
            <form action="" onSubmit={tryLogin}>
                <label htmlFor="" >Username: </label>
                <input type="text" onChange={handleChangeLogin} name="email"/>
                <label htmlFor="" > Password: </label>
                <input type="password" onChange={handleChangeLogin} name="password"/>
                <button className={styles.btn}>login</button>
            </form>
            <p>Don't have an account? <button className={styles.btn} onClick={handleSwitch}>Sign Up</button></p>
            </>
            : <>
            <h2>Sign Up</h2>
            <div style={{color:"red", fontSize:'1.15rem', fontWeight:'700'}} >{message}</div>
            <form action="" onSubmit={trySignUp}>
                <label htmlFor="" >Username: </label>
                <input type="text" onChange={handleChangeSignUp} name="email"/>
                <label htmlFor="" > Password: </label>
                <input type="password" onChange={handleChangeSignUp} name="password"/>
                <button className={styles.btn}>Sign Up</button>
            </form> 
            <p>Have an account? <button className={styles.btn} onClick={handleSwitch}>Go back</button></p>
            </> }
        </section>
    )
} 