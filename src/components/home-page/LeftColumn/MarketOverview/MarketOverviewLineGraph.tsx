import * as React from 'react';
import styled from 'styled-components';
import { ApexOptions } from "apexcharts";
import Chart from 'react-apexcharts'
import type { MarketOverviewTupleTypes } from './MarketOverview';

const Container = styled.div`
  display: flex;
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
   background: '#32323e',
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
      show: false,
      formatter: val => ''
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
          show: false,
      },
  },
  yaxis: {
      lines: {
          show: false,
      },
      
  }
},
dataLabels: {
  enabled: false,
},
stroke: {
   show: true,
   // curve: 'smooth',
   lineCap: 'butt',
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


const MarketOverviewLineGraph: React.FunctionComponent<IMarketOverviewLineGraphProps> = ({marketOverviewData}) => {
  return (
    <Container>

        market over view graphs

        <Chart
       
       options={{
           ...options,
           xaxis: {
               labels: {show: false},
               axisBorder: {show: false},
           categories: stockDates.map((item: string)=>item.split('-').slice(1).join('/'))
          }
       }}
       series={[
           
           {
               name: 'Open Price',
               data: stockDates.map((item: string)=>Number(stockDailyData['Time Series (Daily)'][item]['1. open']).toFixed(2))
           },
           {
               name: 'Close Price',
               data: stockDates.map((item: string)=>stockDailyData['Time Series (Daily)'][item]['4. close'])
           }
          ]}
          type={'line'}
          width={750}
          height={340}
          style={{borderWidth: 0}}
      />



    </Container>
  );
};

export default MarketOverviewLineGraph;
 