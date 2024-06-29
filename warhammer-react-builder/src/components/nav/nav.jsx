import styles from './nav.module.css'

export default function Nav() {
    return (
      <nav className={styles.nav}>
        <a href="/">Home</a>
        <a href="/">Login</a>
      </nav> 
    )
}