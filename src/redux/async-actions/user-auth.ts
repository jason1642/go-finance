import { createAsyncThunk } from "@reduxjs/toolkit";
import {LoginUser} from '../../api-requests/user-requests'
import axios from 'axios'



const api = axios.create({
    baseURL: 'https://localhost:7025/api/users',
    withCredentials: true,
})


interface UserLoginSchema {
    username: string;
    password: string;
}
export const userLogin = createAsyncThunk('users/login',
    async (userInput: UserLoginSchema, thunkAPI) => 
        await api.post('/login', userInput).then(res=>{
            console.log(res)
            return res.data
        }, err=>err)
)