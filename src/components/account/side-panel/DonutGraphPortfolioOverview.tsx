import * as React from 'react';
import styled from 'styled-components';
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";



interface ILineGraphPortfolioOverviewProps {
}


const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const options: ApexOptions = {
    chart: {
     id: 'stockPieGraph',
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
     background: 'transparent'
 
    },
    legend: {
        position: 'bottom'
    },
 
    tooltip: {
     followCursor: true,
     theme: 'dark',
 
 
 },
 stroke: {
     show: false,     
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
 grid: {
    show: false
 },

//     markers: {
//      size: 0,
//      colors: ['#255aee', '#26cb8a'],
//      // strokeColors: '#000000',
//      strokeWidth: 0,
//      strokeOpacity: 0,
//      strokeDashArray: 0,
//      fillOpacity: 0,
//      discrete: [],
//      shape: "circle",
//     //  radius: 4,
//      offsetX: 0,
//      offsetY: 0,
//      onClick: undefined,
//      onDblClick: undefined,
//      showNullDataPoints: true,
//      hover: {
//        size: undefined,
//        sizeOffset: 2
//      }
//  }
 
 }

const DonutGraphPortfolioOverview: React.FunctionComponent<ILineGraphPortfolioOverviewProps> = (props) => {
    const [chartOptions, setChartOptions] = React.useState<any>({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      })
 
    return (
    <Container>
        <Chart
            options={options}
            series={[44, 55, 41, 17, 15]}
            type={'donut'}
            width={500}
            // style={{borderWidth: 10}}
        />
    </Container>
  );
};

export default DonutGraphPortfolioOverview;
