import { useState } from 'react'
import './App.css'
import ArmySelection from './components/ArmySelection/ArmySelection'
import Dashboard from './components/Dashboard/Dashboard'
import PopUp from './components/army-selection-popup/PopUp'


function App() {
  const [create, setCreate] = useState(false)
  const [buttonTrigger, setButtonTrigger] = useState(false)
  const [selectedArmy, setSelectedArmy] = useState()
  const [selectedSubFaction, setselectedSubFaction] = useState()

  return (
    <>
    {create 
    ? <>
        <button onClick={() => setCreate(false)}>Submit Army</button>
        <button onClick={() => setCreate(false)}>Go back</button>
        <ArmySelection selectedArmy={selectedArmy} selectedSubFaction={selectedSubFaction}/>
      </>
    : <>
        <button onClick={()=>setButtonTrigger(true)}>Create an Army +</button>
        <Dashboard />
      </>
    }
    <footer>Powered by Wahapedia</footer>
    <PopUp  
    trigger={buttonTrigger} 
    setTrigger={setButtonTrigger} 
    setCreate={setCreate} 
    selectedArmy={selectedArmy}
    setSelectedArmy={setSelectedArmy}
    setselectedSubFaction={setselectedSubFaction}
    />
</>
  )
}

export default App
