
export default function UserArmy(
    {
    armyName,selectedSubFaction,usersArmy,
    pointLimit,remainingPoints,selectedArmy,removeUnit, colour
    }) {
    return (
    <div className="container-for-army-selection">
        <h2 style={{color: colour}}>{armyName}</h2>
        <h3>{selectedSubFaction}</h3>
        <h3>{armyName}</h3>
        <p>point limit: {pointLimit} <span>w/ {remainingPoints} pts remaining</span></p>
        <ul> Your Army So far:
            {usersArmy.map((unit,idx) => {
                return (
                    <li key={idx}>{unit}<button value={unit}  id={idx} onClick={removeUnit}>delete this unit</button></li>
                )
            })}
        </ul>
    </div>
    )
}