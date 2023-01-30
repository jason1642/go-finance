import axios from 'axios'

const api = axios.create(
    {
        baseURL: process.env.NODE_ENV === 'production' ?
             'https://net-finance.netlify.app/api' 
             :'https://localhost:7025/api'
    
    }
        )

const dailyHistoricData = 'DailyHistoricdata'


export const fetchMultipleDailyHistoricData = async (stringList: string) => 
    await api.get(`/${dailyHistoricData}/multiple/${stringList}`).then(res=>{
        // console.log(res)
        return res
    }, err=> err)