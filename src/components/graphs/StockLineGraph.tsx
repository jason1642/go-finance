import * as React from 'react';
import styled from 'styled-components';
import Chart from 'react-apexcharts'
import {stockTimeData} from './testOptions'
import './apexChart.css'
import { ApexOptions } from "apexcharts";

interface IStockLineGraphProps {
}


const dates = Object.keys(stockTimeData['Time Series (Daily)']).slice(0, 12).reverse()


console.log(dates)
const Container = styled.div`
  display: flex;
  width: 100%;
  * > {
  }
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

   },


   tooltip: {
    followCursor: true,
    theme: 'dark',


},
stroke: {
    show: true,
    curve: 'smooth',
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
xaxis: {
    categories: dates.map((item: string)=>item.split('-').slice(1).join('/'))
   },


}


const StockLineGraph: React.FunctionComponent<IStockLineGraphProps> = (props) => {
 
 
    return (
    <Container>
       <Chart
       
        options={options}
        series={[
            
            {
                name: 'Open Price',
                data: dates.map((item: string)=>Number(stockTimeData['Time Series (Daily)'][item]['1. open']).toFixed(2))
            },
            {
                name: 'Close Price',
                data: dates.map((item: string)=>stockTimeData['Time Series (Daily)'][item]['4. close'])
            }
           ]}
           type={'line'}
           width={800}
       />

    </Container>
  );
};

export default StockLineGraph;
