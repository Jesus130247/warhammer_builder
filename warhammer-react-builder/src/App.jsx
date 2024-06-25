import { useState } from 'react'
import './components/ArmySelection/ArmySelection'
import './components/Dashboard/Dashboard'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import ArmySelection from './components/ArmySelection/ArmySelection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Dashboard />
    <ArmySelection />
    </>
  )
}

export default App
