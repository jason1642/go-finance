import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
    'https://main.d1pbrktrl7a0d8.amplifyapp.com/api' 
    :'https://localhost:7025/api',
    withCredentials: true,
    // ^ Enables cookie access and changes
})


interface UserLoginSchema {
    username: string;
    password: string;
}






// CURRENTLY NOT IN USE
// Use ../features/userApi file for cleaner fetching and caches





export const userLogin = createAsyncThunk('user/login',
    async (userInput: UserLoginSchema, thunkAPI) => 
        await api.post('/login', userInput).then(res=>{
            console.log(res)
            return res
        }, err=>err)
)




export const verifyUser = createAsyncThunk('user/verify',
        async (thunkAPI)=> 
            await api.post('/verify').then(res=>{
                console.log(res)
                return {data: res.data, isAuthenticated: true, isLoading: false}
            },err=>{
                console.log(err)
            })

)


export const logoutUser = createAsyncThunk('user/logout',
            async(thunkAPI) => 
                await api.post('/logout').then(res=>{
                    // No backend response, just status 200
                    return {data: undefined, isAuthenticated: false, isLoading: false}
                }).catch(err=>{
                    console.log(err)                          
                })
        )