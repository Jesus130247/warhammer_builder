import { useState } from 'react'
import './App.css'
import ArmySelection from './components/ArmySelection/ArmySelection'
import Header from './components/Header/Header'
import PopUp from './components/PopUp/PopUp'
import Footer from './components/footer/footer'
import ArmyList from './components/ArmyList/ArmyList'
import Login from './pages/Login.jsx'
import { getUserFromLocalStorage } from './utils/auth_service.js'
import { SaveArmy } from './utils/user_armies.js'


function App() {
  const [user, setUser] = useState(getUserFromLocalStorage())
  const [create, setCreate] = useState(false)
  const [buttonTrigger, setButtonTrigger] = useState(false)
  const [selectedArmy, setSelectedArmy] = useState()
  const [selectedSubFaction, setselectedSubFaction] = useState()
  const [armyName, setArmyName] = useState('')
  const [pointLimit, setPointLimit] = useState(1000)
  const [colour, setColour] = useState('#dadada')
  const [usersArmy, setUsersArmy] = useState([])
  const [remainingPoints ,setRemainingPoints] = useState(pointLimit)
  function onLogin(userInfo) {
    setUser(userInfo)
  }
  function onLogout() {
    setUser(null)
    localStorage.removeItem('token')
  }

  function handleCancel(e) {
    setCreate(false)
    setselectedSubFaction()
    setSelectedArmy()
    setArmyName('')
    setUsersArmy([])
  }
  // function saveArmy(user_id, faction_chosen_id, subfaction_chosen, army_name, points, user_army_array) {}
  function handleSave() {
    let armyUnitsIdArray = usersArmy.map(unit => unit[0])
    SaveArmy(Number(user.id), selectedArmy.faction_id, selectedSubFaction, armyName,
      Number(pointLimit - remainingPoints), armyUnitsIdArray )
    handleCancel()
  }

  return ( <> 
    {user ? 
    <div className='body'>
      <div className="centerThis">
      <header>
        <span>logged in as : {user.email} </span>
        <button onClick={onLogout}>logout</button>
      </header>
        <Header onLogout={onLogout}/>
      </div>
      <div className="create_!">
      {create 
      ? <>
        <div className="centerThis">
            <button className='btn' onClick={handleCancel}>Cancel</button>
        </div>
        <ArmySelection 
          armyName={armyName} 
          selectedArmy={selectedArmy} 
          selectedSubFaction={selectedSubFaction}
          pointLimit={pointLimit}
          colour={colour}
          handleCancel={handleCancel}
          usersArmy={usersArmy}
          setUsersArmy={setUsersArmy}
          handleSave={handleSave}
          remainingPoints={remainingPoints}
          setRemainingPoints={setRemainingPoints}
          />
        </>
      : <div className="centerThis">
          <button className='btn' onClick={()=>setButtonTrigger(true)}>Create an Army +</button>
          <ArmyList user={user} />
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
        setRemainingPoints={setRemainingPoints}
        />
    </div>
    : <Login onLogin={onLogin} />} 
  </> )
}

export default App
