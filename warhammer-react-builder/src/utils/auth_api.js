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

export async function GetUser(email) {
    let res = await axios.get(`/api/user/${email}`)
    console.log(res)
    return res
}

// AuthApi.login()
// use axios library => object with 
//      different functions, use instead of fetching
// pnpm i axios