import * as React from 'react';
import styled from 'styled-components';
import Chart from 'react-apexcharts'
import {stockTimeData} from './testOptions'


interface IStockLineGraphProps {
}


const dates = Object.keys(stockTimeData['Time Series (Daily)']).slice(0, 8).reverse()
// const relativeLowestPrice = dates


console.log(dates)
const Container = styled.div`
  display: flex;
  background-color: #515151;
  /* color: white; */
  * > {
    /* color: white; */
  }
`;

var options = {
   chart: {
    id: 'stockLineGraph',

    // background: 'slategray',
    // theme: {
    //     mode: 'dark'
    //    },
  
   },
   
   
   xaxis: {
    categories: dates.map((item: string)=>item.split('-').slice(1).join('/'))
   },
//    series: [
//     {
//         name: 'series-1',
//         data: [30, 40, 45, 50, 49, 60, 70, 91]
//     }
//    ],

}


const StockLineGraph: React.FunctionComponent<IStockLineGraphProps> = (props) => {
 
 
    return (
    <Container>
       <Chart
        options={options}
        series={[
            {
                name: 'series-1',
                data: dates.map((item: string)=>stockTimeData['Time Series (Daily)'][item]['4. close'])
            }
           ]}
           type={'line'}
           width={800}
        //    style={{color: 'white'}}

       />

    </Container>
  );
};

export default StockLineGraph;
