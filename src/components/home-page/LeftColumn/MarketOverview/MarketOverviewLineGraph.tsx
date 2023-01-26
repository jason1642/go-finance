import * as React from 'react';
import styled from 'styled-components';
import { ApexOptions } from "apexcharts";
import Chart from 'react-apexcharts'
import type { MarketOverviewTupleTypes } from './MarketOverview';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin-top: 1rem;
  /* width: 100%; */
`;


const options: ApexOptions = {
  chart: {
   id: 'stockLineGraph',
   animations: {
       enabled: true,
       easing: 'easeinout',
       speed: 500,
       animateGradually: {
           enabled: true,
           delay: 100
       },
       dynamicAnimation: {
           enabled: true,
           speed: 300
       }
   },
   background: 'transparent',
   toolbar: {
      show: false,
  },
  zoom: {
      enabled: false,
  }
  
  },

 
  tooltip: {
      // enabled: false,
   followCursor: true,
   theme: 'dark',


},
xaxis: {
  type: 'datetime',
  labels: {
      // show: false,
      // formatter: val => ''
  },
  axisBorder:{
      show: false,
  },
   axisTicks: {
      show: false,
   },
   
},
yaxis: {
  labels: {
      show: false,
  }
},

grid: {
  xaxis: {
      lines: {
          show: true,
      },
  },
  yaxis: {
      lines: {
          show: false,
      },
      
  }
},
legend: {
  show: false
},
dataLabels: {
  enabled: false,
},
stroke: {
   show: true,
   // curve: 'smooth',
   lineCap: 'round',
   colors: undefined,
   width: 2,
   dashArray: 0,      
},
theme: {
   mode: 'dark', 
   palette: 'palette1', 
   monochrome: {
       enabled: false,
       color: '#255aee',
       shadeTo: 'dark',
       shadeIntensity: 0.65
   },
},

markers: {
  size: 0,
  colors: ['#255aee', '#26cb8a'],
  // strokeColors: '#000000',
  strokeWidth: 0,
  strokeOpacity: 0,
  strokeDashArray: 0,
  fillOpacity: 0,
  discrete: [],
  shape: "circle",
  radius: 4,
  offsetX: 0,
  offsetY: 0,
  onClick: undefined,
  onDblClick: undefined,
  showNullDataPoints: true,
  hover: {
  size: undefined,
  sizeOffset: 2
  }
}

}




interface IMarketOverviewLineGraphProps {
  marketOverviewData: MarketOverviewTupleTypes;
}



const mapStockDataSeries: (marketData: any) => Array<{symbol: string, singleDateData: Array<{date: string, data: any}>}> | undefined = (marketData: any) => {
    
  const result: Array<any> = marketData !== undefined ?  marketData.map((item: any)=>{

    const timeSeriesData = Object.keys(item['Time Series (Daily)']).map(dateKey=> ({date: dateKey, data: item['Time Series (Daily)'][dateKey]}))

    return ({symbol: item.symbol, singleDateData: timeSeriesData})
  }) : []
 
  return result
}



const MarketOverviewLineGraph: React.FunctionComponent<IMarketOverviewLineGraphProps> = ({marketOverviewData}) => {
  
  
  const stockSeriesData: Array<{symbol: string, singleDateData: Array<{date: string, data:  {
    ['1. open']: string;
    ['2. high']: string;
    ['3. low']: string;
    ['4. close']: string;
    ['5. volume']: string;
    
}}>}> | undefined = React.useMemo(()=>mapStockDataSeries(marketOverviewData), [marketOverviewData])

 



  





  React.useEffect(()=>{
    console.log(marketOverviewData)
    console.log(stockSeriesData)
  },[marketOverviewData])

  return (
    <Container>

        {/* market over view graphs */}

       {stockSeriesData !== undefined && marketOverviewData &&
        <Chart
       
       options={{
           ...options,
           xaxis: {
               labels: {show: false},
               axisBorder: {show: false},
           categories: stockSeriesData && stockSeriesData.length > 0 ? stockSeriesData[0].singleDateData.map(item=>item.date.split('-').slice(1).join('/')) : []
          }
       }}
       series={
        
        stockSeriesData.map(item=> ({name: item.symbol, data: item.singleDateData.map(ele=>+Number(ele.data['1. open']).toFixed(2))}))

       }
          type={'line'}
          // width='100%'
          height={340}
          style={{borderWidth: 0}}
      />}



    </Container>
  );
};

export default MarketOverviewLineGraph;
 