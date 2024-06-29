import { useState } from 'react'
import './App.css'
import ArmySelection from './components/ArmySelection/ArmySelection'
import Header from './components/Header/Header'
import PopUp from './components/PopUp/PopUp'
import Nav from './nav'
import Footer from './components/footer/footer'
import ArmyList from './components/ArmyList/ArmyList'


function App() {
  const [create, setCreate] = useState(false)
  const [buttonTrigger, setButtonTrigger] = useState(false)
  const [selectedArmy, setSelectedArmy] = useState()
  const [selectedSubFaction, setselectedSubFaction] = useState()
  const [armyName, setArmyName] = useState('')
  const [pointLimit, setPointLimit] = useState(1000)
  const [colour, setColour] = useState('#dadada')

  function handleCancel(e) {
    setCreate(false)
    setselectedSubFaction()
    setSelectedArmy()
    setArmyName('')
  }

  return (<div className='body'>
    <div className="centerThis">
      <Nav />
      <Header />
    </div>
    <div className="create_!">
      {create 
      ? <>
        <div className="centerThis">
            <button className='btn' onClick={handleCancel}>Cancel</button>
            <button className='btn' onClick={() => setCreate(false)}>Save Army</button>
        </div>
          <ArmySelection 
            armyName={armyName} 
            selectedArmy={selectedArmy} 
            selectedSubFaction={selectedSubFaction}
            pointLimit={pointLimit}
            colour={colour}
          />
        </>
      : <div className="centerThis">
          <button className='btn' onClick={()=>setButtonTrigger(true)}>Create an Army +</button>
          <ArmyList />
          </div>
      }
    </div>
    <div className="centerThis">
      <Footer />  
    </div>
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
      setColour={setColour}
    />
  </div>
  )
}

export default App
