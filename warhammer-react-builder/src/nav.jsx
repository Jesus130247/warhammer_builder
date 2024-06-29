import App from './App.jsx'
import styles from './nav.module.css'
import { Route, Routes, Link } from 'react-router-dom'

export default function Nav() {
    return (
      <>
      <nav className={styles.nav}>
        {/* <Link to="/">Home</Link> */}
        {/* <Link href="/login">Login</Link> */}
      </nav> 
      {/* <Routes>
        <Route path='/' element={<App />}></Route>
      </Routes> */}
      </>
    )
}