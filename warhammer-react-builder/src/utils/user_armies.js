import axios from 'axios'

export async function SaveArmy(user_id, faction_chosen_id, subfaction_chosen, army_name, points, pointLimit, colour, user_army_array) {
    if (!army_name) {
        army_name = faction_chosen_id
    }
    let res = await axios.post(`/api/saveArmy/${user_id}/${faction_chosen_id}/${JSON.stringify(subfaction_chosen)}/${army_name}/${points}/${pointLimit}/${colour.slice(1)}/${user_army_array}`) 
    console.log(res)
    return res.rows
}

export async function DeleteArmy(armyId) {
    let res = await axios.delete(`/api/delete/army/${armyId}`) 
    return res.data
}

export async function updateArmy(army_id, faction_chosen_id, subfaction_chosen, army_name, points, pointLimit, colour, user_army_array) {
    
    let res = await axios.post(`/api/updateArmy/${army_id}/${faction_chosen_id}/${JSON.stringify(subfaction_chosen)}/${army_name}/${points}/${pointLimit}/${colour}/${user_army_array}`) 
    console.log(res)
    return res.rows
}