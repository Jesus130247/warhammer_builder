import { useState } from 'react'
import './App.css'
import ArmySelection from './components/ArmySelection/ArmySelection'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  const [create, setCreate] = useState(false)
  function handleClick() {
      setCreate(!create)
  }

  return (
    <>
    {create 
    ? <>
        <button onClick={handleClick}>Submit Army</button>
        <ArmySelection />
      </>
    : <>
        <button onClick={handleClick}>Create an Army +</button>
        <Dashboard />
      </>
    }
    <footer>Powered by Wahapedia</footer>
</>
  )
}

export default App
