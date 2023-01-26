import React from 'react'
import styled from 'styled-components'
import MarketPriceTable from './MarketPriceTable'
import MarketOverviewLineGraph from './MarketOverviewLineGraph';
import { fetchMultipleDailyHistoricData } from '../../../../api-requests/stock-historic-data-requests';
import { DailyHistoricDataTypes } from '../../../../types/stock-data-type-db';

interface ComponentProps {
  
}  

const Container = styled.div`
      padding : 2rem 3rem;
      border-radius: 20px;
      background-color: #4d505f;
      background-color: #393945;
      margin-bottom: 6px;
  `;

  const Title = styled.h1`
      font-size: 24px;
      font-weight: 300;
      margin: 0 0 1rem 0;
      color: #8f94ab;
  `;
type MarketOverviewTupleTypes  = [DailyHistoricDataTypes, DailyHistoricDataTypes, DailyHistoricDataTypes ,DailyHistoricDataTypes]


const MarketOverview: React.FunctionComponent<ComponentProps> = () => {

  const [marketOverviewData, setMarketOverviewData] = React.useState<MarketOverviewTupleTypes>()

  fetchMultipleDailyHistoricData('SPY,QQQ,NDAQ,DIA').then(res=>{
    setMarketOverviewData(res.data)
    console.log(res)
  }).catch(err=>{
    console.log(err)
  }   
    )

  return (
    <Container>
      <Title>Markets</Title>
      <MarketPriceTable marketOverviewData={marketOverviewData} />  




      <MarketOverviewLineGraph />
    </Container>
  );
}

export default MarketOverview;