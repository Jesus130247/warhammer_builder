import { useState } from "react"
import { signUp, login } from "../utils/auth_api"
import styles from './Login.module.css'

export default function Login(props) {
    const [formData, setFormData] = useState({ user:'', password:''})
    const [newUser, setNewUser] = useState({ user:'', password:''})

    async function tryLogin(e) {
        e.preventDefault()
        
        try {
            let token = await login(formData)
            localStorage.setItem('token', token)
            props.onLogin(formData)
        } catch (err) {
            console.log(err)
            alert('invalid email or password')
        }
    }
    async function trySignUp(e) {
        e.preventDefault()
        props.onLogin(newUser)
        try {
            await signUp(newUser)
        } catch (err) {
            console.log(err)
            alert('email already exists')
        }
    }
    function handleChangeLogin(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    function handleChangeSignUp(e) {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }
    return (
        <section className={styles.login}>
            <h1>Login</h1>
            <form action="" onSubmit={tryLogin}>
                <label htmlFor="" >email</label>
                <input type="text" onChange={handleChangeLogin} name="email"/>
                <label htmlFor="" >password</label>
                <input type="password" onChange={handleChangeLogin} name="password"/>
                <button>login</button>
            </form>
            <h1>Sign Up</h1>
            <form action="" onSubmit={trySignUp}>
                <label htmlFor="" >email</label>
                <input type="text" onChange={handleChangeSignUp} name="email"/>
                <label htmlFor="" >password</label>
                <input type="password" onChange={handleChangeSignUp} name="password"/>
                <button>Sign Up</button>
            </form>
        </section>
    )
} 