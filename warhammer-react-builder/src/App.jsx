import { useState } from 'react'
import './App.css'
import ArmySelection from './components/ArmySelection/ArmySelection'
import Header from './components/Header/Header'
import PopUp from './components/PopUp/PopUp'
import Footer from './components/footer/footer'
import ArmyList from './viewingArmy/ArmyList/ArmyList.jsx'
import Login from './pages/Login.jsx'
import { getUserFromLocalStorage } from './utils/auth_service.js'
import { SaveArmy, updateArmy } from './utils/user_armies.js'


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
  const [getArmysFromDataBase, setGetArmysFromDataBase] = useState([])

  
  function addUnit(unitId, pts, unitName) {
    if (remainingPoints-pts>=0 ) {
      setRemainingPoints(remainingPoints-pts)
      setUsersArmy([...usersArmy, [unitId, unitName, pts]])
    }
  }
  
  function removeUnit(e) {
    let pts
    setUsersArmy(usersArmy.filter((unit,idx) => {
      if (idx === Number(e.target.id)) {
        pts = Number(unit[2])
      }
      return idx !== Number(e.target.id)
    }))
    setRemainingPoints(remainingPoints+pts)
  }

  function onLogin(userInfo, signUp) {
    setUser(userInfo)
    if (signUp) {
      location.reload()
    }
  }
  
  function onLogout() {
    setUser(null)
    setGetArmysFromDataBase([])
    localStorage.removeItem('token')
  }
  
  function handleCancel(e) {
    setCreate(false)
    setselectedSubFaction()
    setSelectedArmy()
    setArmyName('')
    setUsersArmy([])
    setPointLimit(1000)
    setRemainingPoints(1000)
  }

  function handleSave() {
    setGetArmysFromDataBase([])
    let armyUnitsIdArray = usersArmy.map(unit => unit[0])
    SaveArmy(Number(user.id), selectedArmy.faction_id, selectedSubFaction, armyName,
    Number(pointLimit - remainingPoints), Number(pointLimit), colour, armyUnitsIdArray )
    if (user) {
      fetch(`/api/getMyArmies/${Number(user.id)}`)
      .then(res=> res.json())
      .then(res => setGetArmysFromDataBase(res))    
    }
    handleCancel()
    location.reload()
  }

  return ( <> 
    {user ? 
    <div className='body'>
      <div className="centerThis">
      <header>
        <span>logged in as : {user.email} </span>
        <button className='btn' onClick={onLogout}>logout</button>
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
          addUnit={addUnit} 
          removeUnit={removeUnit}
          />
        </>
      : <div className="centerThis">
          { getArmysFromDataBase.length < 6 ? <button className='btn' onClick={()=>setButtonTrigger(true)}>Create an Army +</button> : <div>Reached Maximum Army Count of 5</div>}
          <ArmyList 
          user={user}
          getArmysFromDataBase={getArmysFromDataBase}
          setGetArmysFromDataBase={setGetArmysFromDataBase}
          handleCancel={handleCancel}
           />
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
