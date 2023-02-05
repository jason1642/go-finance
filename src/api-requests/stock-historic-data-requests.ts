import axios from 'axios'

const api = axios.create(
    {
        baseURL: process.env.NODE_ENV === 'production' ?
             'https://main.d1pbrktrl7a0d8.amplifyapp.com/api' 
             :'https://localhost:7025/api'
    ,headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    },
    
        )

const dailyHistoricData = 'DailyHistoricdata'


export const fetchMultipleDailyHistoricData = async (stringList: string) => 
    await api.get(`/${dailyHistoricData}/multiple/${stringList}`).then(res=>{
        // console.log(res)
        return res
    }, err=> err)