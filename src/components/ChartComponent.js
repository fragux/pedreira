import React from 'react'
import { Chart } from 'react-charts'
import './ChartComponent.css'

export default function MyChart(maquina) {

console.log(maquina.maquina.timeTotal);
  var min = 100;
   var max = 2200;
   let rand =  min + (Math.random() * (max-min));
   const data = React.useMemo(
      () => [
        {
          label: 'Series 1',
          data: [{ x: 1, y: rand}, { x: 2, y: maquina.maquina.timeTotal }, { x: 3, y: rand },   { x: 4, y: (maquina.maquina.timeTotal+100) }],
          color: 'gray',
        },
        {
          label: 'Series 2',
          data: [{ x: 1, y: 100 }, { x: 2, y: rand }, { x: 3, y: 100 }, { x: 4, y: maquina.maquina.timeTotal -200 }],
          color: 'red'
        },
        {
          label: 'Series 3',
          data: [{ x: 1, y: 100 }, { x: 2, y: 5 }, { x: 3, y: rand }, { x: 4, y: maquina.maquina.timeTotal /50 }],
          color: 'black'
        }
      ],
      [maquina.maquina.timeTotal, rand]
    )
  
    const axes = React.useMemo(
      () => [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left', overflow: 'visible' }
      ],
      []
    )
  
    return (
      <div className="row-chart">            
        <Chart data={data} axes={axes} style={{
          width: '90vw',
          height: '49vh',
          position: 'relative',   
          overflow: 'visible'
        }}   />
      </div>
    )
  }

  