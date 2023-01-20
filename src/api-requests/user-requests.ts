import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:7025/api/users',
    withCredentials: true,
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



export const verifyUser = async ()=> 
   await api.post('/verify').then(res=>{
    console.log(res)
   },err=>{console.log(err)})
