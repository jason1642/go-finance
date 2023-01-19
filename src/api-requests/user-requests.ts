import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:7025/api/users'
})


interface UserLoginSchema {
    username: string;
    password: string;
}
export const LoginUser = async (userInput: UserLoginSchema) => 
    await api.post('/login', userInput).then(res=>{
        console.log(res)
        return res.data
    })