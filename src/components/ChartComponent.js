import React, { useEffect, useState, forwardRef } from "react";
import { Card, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Chart } from "react-charts";
import "./ChartComponent.css";
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FirstPage,
  LastPage,
  ViewColumn,
  SaveAlt,
  FilterList,
  Search,
  Remove,
} from "@material-ui/icons";
import { FlexFlowContext } from "twilio/lib/rest/flexApi/v1/flexFlow";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import Machine from "./MachineComponent";

export default function MyChart({
  maquina,
  machine,
  currentItemChart,
  selectedMaquina,
  kWh,
}) {
  console.log("Gráfico para teste: ", machine);
  console.log("Item selecionado no CHART: ", currentItemChart);
  maquina = [
    {
      x: 0,
      y: 0,
      label: "NONE",
    },
  ];

  function tempo() {
    if (maquina.length <= 8) return "Hora ";
    else return "Dia ";
  }

  const [active = "Linhas", setActive] = useState();
  const [isModalOpen, setModal] = useState(false);

  //const [maquinaChart, setMaquinaChart] = useState(machine);
  console.log("Botão toggle: ", active);

  //const [chartLabel, setChartLabel] = useState([]);
  //var min = 100;
  // var max = 2200;
  //let rand =  min + (Math.random() * (max-min));
  let x = 1;
  if (machine && currentItemChart === "pecas") {
    maquina = machine.map(({ n_pecas }) => {
      return {
        x: x++,
        y: n_pecas,
        label: "Peças Produzidas",
      };
    });
  } else if (machine && currentItemChart === "corrente") {
    maquina = machine.map(({ consumo_rms }) => {
      return {
        x: x++,
        y: consumo_rms,
        label: "Corrente em Amperes",
      };
    });
  } else if (machine && currentItemChart === "horas") {
    maquina = machine.map(({ hora_trab, data_hora }) => {
      return {
        x: x++,
        y: hora_trab,
        label: "Horas de trabalho",
      };
    });
  } else if (machine && currentItemChart === "agua") {
    maquina = machine.map(({ consumo_litros }) => {
      return {
        x: x++,
        y: consumo_litros,
        label: "Consumo de Água em Litros",
      };
    });
  } else if (machine && currentItemChart === "velocidade") {
    maquina = machine.map(({ velocidade_fio }) => {
      return {
        x: x++,
        y: velocidade_fio,
        label: "Velocidade em RPM",
      };
    });
  } else if (machine && currentItemChart === "lubri") {
    maquina = machine.map(({ hora_lubrificacao, data_hora }) => {
      return {
        x: x++,
        y: parseInt(hora_lubrificacao.substring(0, 2), 10),
        label: "Tempo sem lubrificação",
      };
    });
  }

  console.log(
    "Dados da máquina a serem passados para os eixos X e Y: ",
    machine
  );

  /* const newMachine = machine.maquina.map(({data_hora, index}) => {
                return data_hora = data_hora.substring(0,6);
              });        
*/

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
  );

  const axes = React.useMemo(() => {
    if (active === "Linhas")
      return [
        {
          primary: true,
          type: "linear",
          position: "bottom",
          format: (d) => `${tempo()}${d}`,
        },
        { type: "linear", position: "left", stacked: false },
      ];
    else
      return [
        {
          primary: true,
          type: "ordinal",
          position: "bottom",
          format: (d) => `${tempo()}${d}`,
        },
        { type: "linear", position: "left", stacked: true },
      ];
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
      height: "432px",
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
    if (active === line)
      return {
        transition: "all .5s ease",
        color: "#E4181D",
      };
    else
      return {
        transition: "all .5s ease",
        color: "#bbbaba",
      };
  }, [maquina, useState([])]);

  function handleCheckbox(e) {
    const checked = e.target.checked;
    if (checked) setActive(line);
    else setActive(bar);
  }

  /* function handleTime(e){
        const checked = e.target.checked;
      }*/

  const columns = [
    {
      title: "Data",
      field: "data_hora",
      type: "date",
      dateSetting: {
        format: "dd/MM/yyyy",
      },
    },
    {
      title: "Peças Prod.",
      field: "n_pecas",
    },
    {
      title: "Consumo Água",
      field: "consumo_litros",
    },
    {
      title: "Consumo Elétrico",
      field: "consumo_rms",
    },
    {
      title: "Tensão Fio",
      field: "tensao_fio",
    },
    {
      title: "Velocidade",
      field: "velocidade_fio",
    },
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  function legendaGrafico() {
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
  }

  function toggleModalTabela() {
    setModal(!isModalOpen);
  }

  return (
    <>
      <div className="chart-chart">
        <div id="tools">
          <AiIcons.AiOutlineBarChart size={25} color="#E4181D" />
          <h5 style={{ color: "#333", padding: "0.5rem", fontSize: "15px" }}>
            Gráfico:
          </h5>
          <div className="toggle ">
            <button
              className={"toggle barras" + (active === bar ? " active" : "")}
            >
              Barras
            </button>
            <input
              type="checkbox"
              name="toggleChartType"
              onChange={handleCheckbox}
            ></input>
            <button
              className={"toggle linhas" + (active === line ? " active" : "")}
            >
              Linhas
            </button>
          </div>
          <p>
            <BsIcons.BsTable size={20} color="#E4181D" />
          </p>

          <h5 style={{ color: "#333", fontSize: "15px" }}>Tabela de Dados:</h5>

          <button onClick={toggleModalTabela} className="tabela">
            Visualizar <HiIcons.HiOutlineViewList size={20} />
          </button>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            isOpen={isModalOpen}
            toggle={toggleModalTabela}
            modalTransition={{ timeout: 500 }}
          >
            <ModalHeader toggle={toggleModalTabela}>
              {" "}
              Listagem de parâmetros:{" "}
            </ModalHeader>

            <MaterialTable
              minRows={10}
              icons={tableIcons}
              title={selectedMaquina}
              data={machine}
              columns={columns}
              options={{
                pageSize: 5,
                pageSizeOptions: [5, 10],
                rowStyle: {
                  fontSize: 12,
                  textAlign: "center",
                  fontSizeAdjust: true,
                },
                cellStyle: {
                  textAlign: "center",
                },
                headerStyle: {
                  fontSize: 11,
                  fontWeight: "bold",
                  textAlign: "right",
                  background: "",
                },

                paging: true,
                search: false,
                exportButton: true,
                addRowPosition: true,
              }}
            />
          </Modal>
        </div>

        <div id="grafico">
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
        <div id="tooltipK">
          <BsIcons.BsFillLightningChargeFill size={25} color="#E4181D" />
          <Card
            style={{
              border: "none",
              background: "none",
              margin: "0",
              padding: "0",
            }}
          >
            <h6 style={{ padding: "1rem" }}>Quantidade Eléctrica (KW.h)</h6>
            <h1
              style={{
                color: "#333",
                paddingBottom: "1rem",
                fontSize: "55px",
              }}
            >
              {kWh}
            </h1>
          </Card>
          <div className="detalhes">
            <button style={{ fontSize: "9px" }}>
              Current(mA)<h4>{Math.round(kWh * 10000 * 1.2)}</h4>
            </button>
            <button style={{ fontSize: "9px" }}>
              Power(W)<h4>{Math.round(kWh * 10000 * 1.1)}</h4>
            </button>
            <button style={{ fontSize: "9px" }}>
              Voltage(V)<h4>{Math.round((kWh * 1000) / 1.3)}</h4>
            </button>
            <button style={{ fontSize: "9px" }}>
              Total(kW.h)<h4>{Math.round(kWh * 115)}</h4>
            </button>
          </div>
          <div>
            <h6 style={{ fontSize: "12px", padding: "20px" }}>
              Mês passado: <strong>1.250 kW</strong>
            </h6>
          </div>
        </div>
      </div>
      <div className="cabecalho">{legendaGrafico()} / Tempo</div>
    </>
  );
}
