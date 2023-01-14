import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.iex.cloud/v1/data/core'
})

console.log(process.env.REACT_APP_IEX_API_KEY)
export const fetchStockData = async (symbol: string) => 
await api.get(`/quote/${symbol}?token=${process.env.REACT_APP_IEX_API_KEY}`).then(res=>res,err=>err)
    
 
