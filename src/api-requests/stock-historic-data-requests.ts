import axios from 'axios'

const api = axios.create(
    {
        baseURL: process.env.NODE_ENV === 'production' ?
             'https://dtg1w6c05xnaz.cloudfront.net/api' 
             :'https://localhost:7025/api'
    ,headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    },
    
        )
 console.log(process.env.NODE_ENV)
const dailyHistoricData = 'DailyHistoricData'


export const fetchMultipleDailyHistoricData = async (stringList: string) => 
    await api.get(`/${dailyHistoricData}/multiple/${stringList}`).then(res=>{
        // console.log(res)
        return res
    }, err=> err)