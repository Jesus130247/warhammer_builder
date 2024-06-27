import { useState } from 'react'
import './App.css'
import ArmySelection from './components/ArmySelection/ArmySelection'
import Header from './components/Header/Header'
import PopUp from './components/PopUp/PopUp'
import Nav from './components/nav/nav'
import Footer from './components/footer/footer'
import ArmyList from './components/ArmyList/ArmyList'


function App() {
  const [create, setCreate] = useState(false)
  const [buttonTrigger, setButtonTrigger] = useState(false)
  const [selectedArmy, setSelectedArmy] = useState()
  const [selectedSubFaction, setselectedSubFaction] = useState()
  const [armyName, setArmyName] = useState()
  const [pointLimit, setPointLimit] = useState(1000)

  return (<div className='everything'>
    <Nav />
    <Header />
    <div className="create_!">
      {create 
      ? <>
          <button className='btn' onClick={() => setCreate(false)}>Submit Army</button>
          <button className='btn' onClick={() => setCreate(false)}>Go back</button>
          <ArmySelection 
            armyName={armyName} 
            selectedArmy={selectedArmy} 
            selectedSubFaction={selectedSubFaction}
            pointLimit={pointLimit}
          />
        </>
      : <>
          <button className='btn' onClick={()=>setButtonTrigger(true)}>Create an Army +</button>
          <ArmyList />
        </>
      }
    </div>
    <Footer />
    <PopUp  
      trigger={buttonTrigger} 
      setTrigger={setButtonTrigger} 
      setCreate={setCreate} 
      selectedArmy={selectedArmy}
      setSelectedArmy={setSelectedArmy}
      setselectedSubFaction={setselectedSubFaction}
      selectedSubFaction={selectedSubFaction}
      setArmyName={setArmyName}
      armyName={armyName}
      setPointLimit={setPointLimit}
    />
  </div>
  )
}

export default App
