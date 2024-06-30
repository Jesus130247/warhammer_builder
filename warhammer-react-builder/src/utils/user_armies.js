import axios from 'axios'

export async function SaveArmy(user_id, faction_chosen_id, subfaction_chosen, army_name, points, user_army_array) {
    let res = await axios.post(`/api/saveArmy/${user_id}/${faction_chosen_id}/${subfaction_chosen}/${army_name}/${points}/${user_army_array}`) 
    console.log(res)
    return res.rows
}

// export async function GetMyArmies(userId) {
//     let res = await axios.get(`/api/getMyArmies/${userId}`) 
//     console.log(res)
//     return res.rows
// }