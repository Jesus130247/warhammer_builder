import axios from 'axios'

export async function login(userInfo) {
    let res = await axios.post(`/api/login`, userInfo) 
    console.log(res)
    return res.data.token
}

export async function signUp(userInfo) {
    let res = await axios.post(`/api/signUp`, userInfo) 
    console.log(res)
    return res.data.token
}
