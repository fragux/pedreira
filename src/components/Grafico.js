import React, { useEffect, useState, forwardRef } from "react";
import { Card, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Chart } from "react-charts";
import "./ChartComponent.css";
import  axios from "axios";
import { FlexFlowContext } from "twilio/lib/rest/flexApi/v1/flexFlow";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import Machine from "./MachineComponent";

export default function MyChart({
  machine,
  selectedMaquina,
  time
}) {
 
  function tempo() {
    if (maquina.length <= 8) return "Hora ";
    else return "Dia ";
  }

  const [active = "Linhas", setActive] = useState();
  const [isModalOpen, setModal] = useState(false);
  const [maquina, setMaquina] = useState([]);

  //const [maquinaChart, setMaquinaChart] = useState(machine);
  console.log("Botão toggle: ", active);

  //const [chartLabel, setChartLabel] = useState([]);
  //var min = 100;
  // var max = 2200;
  //let rand =  min + (Math.random() * (max-min));
  let x = 1;
  if (machine) {
     const maquina = machine.map((rowData) => rowData["Tension"])   
     console.log("dados para o gráfico: ", maquina);
  }


  const data = React.useMemo(
    () => [
      {
        label: "Tensão",
        data:  maquina.map(({ Tension }) => {
            return {
              x: x++,
              y: Tension,
              label: "Tensão",
            };
          }),
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
  );

  const axes = React.useMemo(() => {
    if (selectedMaquina)
      return [
        {
          primary: true,
          type: "linear",
          position: "bottom",
          //format: (d) => `${tempo()}${d}`,
        },
        { type: "linear", position: "left", stacked: false },
      ];
    /*else
      return [
        {
          primary: true,
          type: "ordinal",
          position: "bottom",
          //format: (d) => `${tempo()}${d}`,
        },
        { type: "linear", position: "left", stacked: true },
      ];*/
  }, [maquina, useState([])]);

  const line = React.useMemo(
    () => ({
      showPoints: true,
    }),
    [useEffect]
  );

  const bar = React.useMemo(
    () => ({
      type: "bar",
    }),

    [useEffect]
  );

  const defs = (
    <defs>
      <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
        <stop offset="0%" stopColor="#17EAD9" />
        <stop offset="100%" stopColor="#6078EA" />
      </linearGradient>
      <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
        <stop offset="0%" stopColor="#FCE38A" />
        <stop offset="100%" stopColor="#F38181" />
      </linearGradient>
      <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
        <stop offset="0%" stopColor="#42E695" />
        <stop offset="100%" stopColor="#3BB2B8" />
      </linearGradient>
      <linearGradient id="3" x1="0" x2="0" y1="1" y2="0">
        <stop offset="0%" stopColor="#F4Ea0A" />
        <stop offset="100%" stopColor="#df4081" />
      </linearGradient>
    </defs>
  );
  const style = React.useMemo(
    () => ({
      width: "auto",
      height: "50vh",
      right: "1rem",
      top: "2rem",
      position: "relative",
      overflow: "visible",
      display: "inline-flex",
      placeItems: "center",
      paddingLeft: "1.5rem",
    }),
    [useEffect]
  );

  const getSeriesStyle = React.useCallback(
    () => ({
      transition: "all .5s ease",
      color: "gray",
    }),
    [maquina, useState([])]
  );

  const getDatumStyle = React.useCallback(() => {
    if (selectedMaquina)
      return {
        transition: "all .5s ease",
        color: "#E4181D",
      };
    /*else
      return {
        transition: "all .5s ease",
        color: "#bbbaba",
      };*/
  }, [maquina, useState([])]);

  function handleCheckbox(e) {
    const checked = e.target.checked;
    if (checked) setActive(line);
    else setActive(bar);
  }

  /* function handleTime(e){
        const checked = e.target.checked;
      }*/

 


  /*function legendaGrafico() {
    switch (currentItemChart) {
      case "corrente":
        return "Corrente em Amperes";
      case "pecas":
        return "N.º de Peças Produzidas";
      case "agua":
        return "Consumo de Água em Litros";
      case "velocidade":
        return "Velocidade em RPM";
      case "lubri":
        return "Tempo da última Lubrificação";

      default:
        return "NO VALUES";
    }
  }*/

  async function getData(name) {
    if (name === "STONECUT") name = "cnc1";
    else if (name === "STONECUT45MILL") name = "cnc2";
    else if (name === "MINORÇA") name = "minorca";
    else if (name === "LOUSADA") name = "lousada";

   
      await axios
        .get(`http://localhost:3001/machine/${name}/${time}`)
        .then((response) => {
          setMaquina(response.data);
        });
   
  }

  useEffect(() => {
    if (selectedMaquina) getData(selectedMaquina);
    console.log("Tempo selecionado para tabela", time);
  }, [machine, selectedMaquina, time]);

 
  return (
    <>
      <div className="container col-12">
       
         <Chart
            data={data}
            getSeriesStyle={getSeriesStyle}
            getDatumStyle={getDatumStyle}
            tooltip
            axes={axes}
            series={active}
            style={style}
          />
        </div>
       
    </>
  );
}
