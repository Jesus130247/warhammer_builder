
import { signUp, login } from "../utils/auth_api"

export default function DemoBtn({props}) {
    async function handleDemo() {
        try {
            let token = await login({ email:'Demo', password:'Demo'})
            localStorage.setItem('token', token)
            props.onLogin({ email:'Demo', password:'Demo'}, true)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
        <button className='btn' onClick={handleDemo}>Demo</button>
        </>
    )
}