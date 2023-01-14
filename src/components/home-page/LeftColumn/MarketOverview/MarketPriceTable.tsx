import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
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

// const IEX_API_KEY = 'pk_3256652724eb490abdfd234401050f50';

interface ComponentProps {

}

const colors1 = ['#52e3c2', '#ff4495']
const colors2 = ['#d211fe', '#40c4ff']

const fourMarkets = ['SPY', 'QQQ', 'IWM', 'DIA']
const fourMarketsNames = [
  { symbol: 'SPY', name: 'S&P 500' },
  { symbol: 'QQQ', name: 'Nasdaq' },
  { symbol: 'IWM', name: 'Russell 2K' },
  { symbol: 'DIA', name: 'Dow' }
]

const MarketPriceTable: React.FunctionComponent<ComponentProps> = () => {

  // console.log(isMarketOpenFunction.isItPremarket())
  // console.log(isMarketOpenFunction.isItAfterHours())


  const [marketOverviewData, setMarketOverviewData] = useState<Array<any>>([])



  let marketDataArray: Array<any> = []
  useEffect(() => {

    // const FMP_API_KEY = '0dafce6ce2fa49c8f0acd0ac316dfa33';



    // fourMarkets.map(async ele => {
    //   const fetchStockData = async () => {
    //     const response = await axios.get(`https://cloud.iexapis.com/stable/stock/${ele}/quote?token=${IEX_API_KEY}`)
    //     setMarketOverviewData(oldArr => [...oldArr, response.data])
    //     // console.log(response.data)
    //   }
    //   setMarketOverviewData(marketDataArray)
    //   fetchStockData()
    // })
  }, [])


  const pairContainerFunction = (sliceStart: any, sliceUpTo:any, colorArr:any) => {
    return marketOverviewData.slice(sliceStart, sliceUpTo).map((ele, i) =>

      <MarketTile key={i} style={{ marginRight: i === 1 ? '0' : '20px', borderLeft: `3px solid ${colorArr[i]}` }}>
        <Link style={{ textDecoration: 'none' }} to='/quote/SPY'>


          <MarketTileRow>
            <MarketTileIndexName>
              {fourMarketsNames.filter(str => str.symbol === ele.symbol)[0].name
              }
            </MarketTileIndexName>
            <div>
              <span style={{ color: ele.changePercent >= 0 ? '#52e3c2' : '#ff4463', fontSize: '12px', alignContent: 'center' }}><i style={{ display: 'inline', fontSize: '14px' }} className={ele.changePercent >= 0 ? "fas fa-caret-up" : "fas fa-caret-down"}></i>{(ele.changePercent * 100).toFixed(2).toString()}%</span>
            </div>
          </MarketTileRow>

          <MarketTileRow style={{ fontSize: '12px', marginTop: '4px' }}>

            <div style={{ color: "#b4b8cd", fontWeight: 300, fontSize: '12px' }}>
              {/* {isMarketOpenFunction.isItPremarket() ? 'Pre Market' : isMarketOpenFunction.isItAfterHours() ? 'After Hours' : ''} */}
            </div>
          </MarketTileRow>


        </Link>
      </MarketTile>


    )
  }




  console.log(marketOverviewData)


  return (marketDataArray ?
    <Container>


      <PairContainer>

        {marketOverviewData ? pairContainerFunction(0, 2, colors1) : <></>}
      </PairContainer>


      <PairContainer>
        {marketOverviewData ? pairContainerFunction(2, 4, colors2) : <></>}


      </PairContainer>


    </Container> : <></>
  );
}

export default MarketPriceTable;


// after hours through weekend