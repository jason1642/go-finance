import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LeftColumn from '../components/stock-detail-page/LeftColumn/LeftColumn'
import RightColumn from '../components/stock-detail-page/RightColumn/RightColumn'
import axios from 'axios'

interface ComponentProps {

}

const Container: React.FunctionComponent<ComponentProps> = (props: any) => {


  const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 768px) {
    flex-direction: column;
  }
  `;
  const [stockData, setStockData] = useState()
  useEffect(() => {


    const IEX_API_KEY = 'pk_3256652724eb490abdfd234401050f50';


    const fetchStockData = async () => {
      const response = await axios.get(`https://cloud.iexapis.com/stable/stock/${props.match.params.symbol}/quote?token=${IEX_API_KEY}`)
      setStockData(response.data)
      console.log(props.match.params.symbol)
    }
    console.log(stockData)


    fetchStockData()
  }, [])
  console.log(stockData)

  return (
    <Container>
      <LeftColumn stockData={stockData} symbol={props.match.params.symbol} />
      <RightColumn symbol={props.match.params.symbol} />
    </Container>
  );
}

export default Container;