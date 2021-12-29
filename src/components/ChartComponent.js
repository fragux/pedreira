import React, {useEffect, useState} from 'react'
import { Chart } from 'react-charts'
import './ChartComponent.css'

export default function MyChart({maquina,machine, currentItemChart}) {
console.log("Gráfico para teste: ", machine);
console.log("Item selecionado no CHART: ", currentItemChart);
maquina=[{
  x: 0,
  y:0,
  label: "NONE"

}]

const [active, setActive] = useState('Linhas');
//const [maquinaChart, setMaquinaChart] = useState(machine);
console.log("Botão toggle: ", active);

//const [chartLabel, setChartLabel] = useState([]);
  //var min = 100;
  // var max = 2200;
   //let rand =  min + (Math.random() * (max-min));
   let x=1;
   if(machine && currentItemChart==="pecas"){
     maquina = machine.map(({ n_pecas}) => {
       return{
        x:x++,
        y:n_pecas,
        label: "Peças Produzidas"
      }

     })

    }
   else if(machine && currentItemChart==="corrente"){
    maquina = machine.map(({ consumo_rms}) => {
     return{
       x:x++,
       y:consumo_rms,
       label: "Corrente em Amperes"
     }
    })
    }
    else if(machine && currentItemChart==="horas"){
      maquina = machine.map(({ hora_trab, data_hora}) => {
       return{
         x:x++,
         y:hora_trab,
         label: "Horas de trabalho"
       }
      })
      }
      else if(machine && currentItemChart==="agua"){
        maquina = machine.map(({ consumo_litros}) => {
         return{
           x:x++,
           y:consumo_litros,
           label: "Consumo de Água em Litros"
         }
        })
        }
        else if(machine && currentItemChart==="velocidade"){
          maquina = machine.map(({ velocidade_fio}) => {
           return{
             x:x++,
             y:velocidade_fio,
             label: "Velocidade em RPM"
           }
          })
          }
          else if(machine && currentItemChart==="lubri"){
            maquina = machine.map(({ hora_lubrificacao, data_hora}) => {
             return{
               x:x++,
               y:parseInt(hora_lubrificacao.substring(0,2),10),
               label: "Tempo sem lubrificação"
             }
            })
            }


  console.log("Dados da máquina a serem passados para os eixos X e Y: ", maquina);


   const data = React.useMemo(
      () => [
        {
          label: maquina[0].label,
          data: maquina,

        },
        /*{
          label: 'Series 2',
          data: [{ x: 1, y: 100 }, { x: 2, y: rand }, { x: 3, y: 100 }, { x: 4, y: maquina.maquina.timeTotal -200 }],
          color: 'red'
        },
        {
          label: 'Series 3',
          data: [{ x: 1, y: 100 }, { x: 2, y: 5 }, { x: 3, y: rand }, { x: 4, y: maquina.maquina.timeTotal /50 }],
          color: 'black'
        }*/
      ],
      [maquina, useState([])]
    )

    const axes = React.useMemo(
      () => {
        if(active==="Linhas")return[

        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left', stacked: false }
      ]
    else return[
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: true }

    ]},
      [maquina, useEffect]
    )

    const line = React.useMemo(
      () => ({
        showPoints:true
      }),
      [useEffect]
    )

    const bar = React.useMemo(
      () => ({
        type: 'bar',
      }),

      [useEffect]
    )

    const style = React.useMemo(()=>({

        width: '100%',
        height: '430px',
        position: 'relative',
        overflow: 'visible',
        "paddingBottom": "2rem",
        "marginLeft": "-2rem"

    }),
    [useEffect])


    const getSeriesStyle = React.useCallback(
      () => ({
        transition: 'all .5s ease',
        color:'gray'
      }),
      [maquina, useState([])]
    )

    const getDatumStyle = React.useCallback(
      () => {
        if(active===line)
        return({

        transition: 'all .5s ease',
        color: "#E4181D"
      })
    else return({

      transition: 'all .5s ease',
      color: "#bbbaba"
    })

    },
      [maquina, useState([])]
    )

    function handleCheckbox(e) {
      const checked = e.target.checked;
      if (checked)
        setActive(line);
        else setActive(bar)
      };

     /* function handleTime(e){
        const checked = e.target.checked;
      }*/




    return (
      <div className="container col-12 col-md-12 chart">
      <div className="toggle ">

            <button className={"toggle barras" + (active === bar ? " active" : "")}>Barras</button>
            <input type="checkbox" name="toggleChartType" active={active === 'Linhas' } onChange={handleCheckbox} ></input>
            <button className={"toggle linhas" + (active === line ? " active" : "")}>Linhas</button>
                </div>
               


        <Chart
          data={data}
          getSeriesStyle={getSeriesStyle}
          getDatumStyle={getDatumStyle}
          tooltip
          axes={axes}
          series={active}
          style={style}   />

      </div>
    )
  }

