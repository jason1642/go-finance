import React, { useState, useEffect, useMemo, FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { fetchMultipleDailyHistoricData } from '../../../../api-requests/stock-historic-data-requests';
import type { DailyHistoricDataTypes } from '../../../../types/stock-data-type-db';
// import isMarketOpenFunction from '../../../../resources/isMarketOpenFunction'

const Container = styled.div`
display: flex;
/* flex-grow: 1; */
margin-right: -20px;
flex-wrap: wrap;
justify-content: space-around;
`;
//tiles
const MarketTile = styled.div`
min-width: 90px;
display: flex;
flex-direction: column;
flex: 1 1 0px;
padding: 12px 16px;
background-color : #40424f;
border-radius: 3px;
margin-right: 20px;
float: right;
border-left: 3px solid yellow;
&:hover {
  background-color: #4d505f;
  cursor: pointer;
}
@media (max-width: 700px){

}
`;

const MarketTileRow = styled.div`
display: flex;
justify-content: space-between;
align-content: center;
`;

const MarketTileIndexName = styled.div`
align-items: center;
font-size: 14px;
font-weight: bold;
color: white;
`;

//tiles
const PairContainer = styled.div`
flex-grow: 1;
display: flex;
margin: 0 20px 10px 0;
justify-content: space-between;
`;
const fourMarkets = ['SPY', 'QQQ', 'IWM', 'DIA']
const fourMarketsNames = [
  { symbol: 'SPY', name: 'S&P 500' },
  { symbol: 'QQQ', name: 'Invesco Trust Series' },
  { symbol: 'NDAQ', name: 'Nasdaq' },
  { symbol: 'DIA', name: 'Dow' }
]

const pairContainerFunction: (marketData: any) => React.ReactElement[] = (marketData) => {
  console.log(marketData)
  if(marketData !== undefined) return marketData.map(( {symbol, 'Meta Data': {'3. Last Refreshed': lastRefreshed}, 'Time Series (Daily)': TimeSeries}:DailyHistoricDataTypes, i:number) =>
{
  const {'1. open': open, '4. close': close} = TimeSeries[lastRefreshed]
  const changePercent: number = Number((((Number(open) - Number(close)) / Number(open)) * 100).toFixed(2)) 
return <MarketTile key={symbol} style={{ marginRight: i === 1 ? '0' : '20px', borderLeft: `3px solid ${colors[i]}` }}>
 <Link style={{ textDecoration: 'none' }} to={`/quote/${symbol}`}>

   <MarketTileRow>
     <MarketTileIndexName>
       {fourMarketsNames.filter(item => item.symbol === symbol)[0].name}
     </MarketTileIndexName>
     <div>
       <span style={{ color: changePercent >= 0 ? '#52e3c2' : '#ff4463', fontSize: '12px', alignContent: 'center' }}><i style={{ display: 'inline', fontSize: '14px' }} className={changePercent >= 0 ? "fas fa-caret-up" : "fas fa-caret-down"}></i>
       {}%
       </span>
     </div>
   </MarketTileRow>

   <MarketTileRow style={{ fontSize: '12px', marginTop: '4px' }}>

     <div style={{ color: "#b4b8cd", fontWeight: 300, fontSize: '12px' }}>
       {/* {isMarketOpenFunction.isItPremarket() ? 'Pre Market' : isMarketOpenFunction.isItAfterHours() ? 'After Hours' : ''} */}
     </div>
   </MarketTileRow>


 </Link>
</MarketTile>
})

return [<></>]

}





interface ComponentProps {

}
type colorArrayType = [string, string, string, string]
const colors: colorArrayType = ['#52e3c2', '#ff4495','#d211fe', '#40c4ff']



type MarketOverviewTupleTypes  = [any, any, any ,any]
const MarketPriceTable: React.FunctionComponent<ComponentProps> = () => {

  // console.log(isMarketOpenFunction.isItPremarket())
  // console.log(isMarketOpenFunction.isItAfterHours())


  const [marketOverviewData, setMarketOverviewData] = useState<MarketOverviewTupleTypes>()
  const ElementContainers: (marketData: any)=>React.ReactElement[] =  useMemo(() => pairContainerFunction, [marketOverviewData])


 
  useEffect(() => {


    fetchMultipleDailyHistoricData('SPY,QQQ,NDAQ,DIA').then(res=>{
      setMarketOverviewData(res.data)
      console.log(res)
    }).catch(err=>{
      console.log(err)
    }   
      )


  }, [])


 




  console.log(marketOverviewData)


  return (marketOverviewData ?
    <Container>


      {/* <PairContainer>

        {marketOverviewData ? pairContainerFunction(colors1, marketDataArray) : <></>}
      </PairContainer> */}

      {marketOverviewData && ElementContainers(marketOverviewData)}
      {/* <PairContainer>
        {marketOverviewData ? pairContainerFunction(colors2, marketDataArray) : <></>}


      </PairContainer> */}


    </Container> : <></>
  );
}

export default MarketPriceTable;


// after hours through weekend