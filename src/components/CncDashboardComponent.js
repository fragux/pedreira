import React, { Component } from "react";
//import { Media } from 'reactstrap';
import {
  Card,
  /* CardTitle,
  CardBody,
  CardText*/
} from "reactstrap";
import { ProgressBar, Badge } from "react-bootstrap";
import { MACHINE } from "../data/machine";
import { LOUSADA } from "../data/maquina";
import { DEFAULT } from "../data/default";
/*import DropdownMaquina from './DropDownMaquina';
import ListaComponent from './ListaComponent';
import Menu from './SelectComponent';*/
import MyChart from "./ChartComponent";
//import { Chart } from 'react-charts/dist/react-charts.development';
import "./DashBoardComponent.css";
import axios from "axios";
import Api from "twilio/lib/rest/Api";
//import { render } from '@testing-library/react';
//import { alignAuto } from 'react-charts/dist/react-charts.development';
//const client = require ('twilio')('AC30d90c932ea37c30c67b90ed466a24ad','d2994d9914dcabe2dd60190c96fb4b0d');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.counterVelocidade = 0;

    this.state = {
      selectedMaquina: this.props.selectedMaquina,
      maquinaValues: MACHINE,
      isClicked: false,
      currentItem: "",
      key: 1,
      machine: [],
      timeTotal: "",
      timePeriod: this.props.currentMode,
      corrente: "",
      velocidade: "",
      realTime: this.props.realTime,
      statusCorrente: false,
      statusVelocidade: false,
      api : this.props.api,
      endPoint: this.props.endPoint,
      production1: [],
      production2: [],
      trabalhosExec: 0,
      trabalhosExec1: 0,
      standBy: false,
      isOffline: false,
      resultXML: "",
      timeStartCNC1: [],
      timeStartCNC2: [],
    };
    this.getData = this.getData.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.randomFunctionCorrente = this.randomFunctionCorrente.bind(this);
    this.randomFunction = this.randomFunction.bind(this);
    this.randomFunctionKw = this.randomFunctionKw.bind(this);
    this.props.parentCallback(this.state.timeTotal);
    this.handleResponse = this.handleResponse.bind(this);
    
    console.log("Botão real time: ---->", this.props.realTime);
  }
  
  async getData() {
    await axios.get("http://localhost:3001/machine/cnc1/last").then((response) => {
      console.log(
        "Get DATA from function getData() and setInterval: ",
        response.data
      );
      this.setState({ machine: response.data });
    });
   await  axios.get("http://localhost:3001/machine/cnc2/last").then((response) => {
      console.log(
        "Get DATA from function getData() and setInterval: ",
        response.data
      );
      this.setState({ machine1: response.data });
    });

    await axios.get("http://localhost:3001/machine/cnc1/job").then((response) => {
      this.setState({ production1: response.data });
    });
    await axios.get("http://localhost:3001/machine/cnc2/job").then((response) => {
      this.setState({ production2: response.data });
    });
    await axios.get("http://localhost:3001/machine/cnc1/start").then((response) => {
      this.setState({ timeStartCNC1: response.data });
    });
    await axios.get("http://localhost:3001/machine/cnc2/start").then((response) => {
      this.setState({ timeStartCNC2: response.data });
    });
    this.calcJob();
    this.calcIsOffLine();
    
  }
  calcIsOffLine = (array) => {
    let currentDate = new Date();
    let result = new Boolean();
    array?.map(({DateTime}) => {
      console.log( Math.abs(currentDate.getMinutes() - DateTime.substring(11, 13)));
      let diff = currentDate.getTime() - Date.parse(DateTime);
      let vmindiff = Math.floor(diff/1000/60); // in minutes
      diff -= vmindiff*1000*60
      console.log( "Diferença das datas :", currentDate.getTime() - Date.parse(DateTime),"Convertida em minutos: ", vmindiff);
      console.log( parseInt(DateTime.substring(8,10)));
      if(vmindiff > 10){
        //console.log("Teste para verificar se está offline: ", true);
        result = true;
      }else result = false;

      //return this.setState({isOffline: true});
    });
    return result;
  }
  calcJob = (array) => {
    const initialValue = 0;
    var result = array?.reduce((previousData, currentData) => (previousData - currentData)%5, initialValue
  );
      
      console.log("Calculo dos trabalhos realizados: ", result);
      return array;
};

  async componentDidMount() {
    this.getData();
    setInterval(() => {
      this.getData();
      this.render();
      if (this.props.realTime)
        this.setState((prevState) => {
          return {
            // corrente: this.randomFunctionCorrente(),
            //velocidade: this.randomFunction(),
            //production: Production
          };
        });
    }, 100000);
  }

  handleResponse = (parentData) => {
    this.props.parentCallback(this.state.timeTotal);
    console.log("Tempo total callback", this.state.timeTotal);
    this.setState({ selectedMaquina: parentData });
    console.log("Dashboard: " + parentData);
    console.log(this.renderSwitch(parentData));
    const maquinaValues = this.renderSwitch(parentData);
    console.log(maquinaValues.maquina);
  };

  renderSwitch(param) {
    switch (param) {
      case "MONOFIO NFC 2000":
        return (this.state = { maquina: MACHINE });
      case "LOUSADA 2000":
        return (this.state = { maquina: LOUSADA });
      default:
        return (this.state = { maquina: DEFAULT });
    }
  }

  handleSelectItem(key, dashboardItem) {
    console.log("Dashboard button:", dashboardItem);
    console.log("Maquina selecionada----> ", this.props.selectedMaquina);
    //this.getTimePeriod(timePeriod);
    this.currentItem = dashboardItem;
    this.setState({ isClicked: true });
    switch (this.props.selectedMaquina) {
      case "MONOFIO NFC 2000":
        switch (this.props.currentMode) {
          case "dia":
            this.setState({endPoint: "/monofio/dia"});
            axios.get("http://localhost:3001/monofio/dia").then((response) => {
              console.log("Get do item selecionado: ", response.data);
              this.setState({ machine: response.data });
              console.log(
                "Atribuição do GET ao estado. ",
                this.props.selectedMaquina,
                this.currentItem
              );
            });
            break;
          case "mes":
            axios.get("http://localhost:3001/monofio/mes").then((response) => {
              console.log("Get do item selecionado: ", response.data);
              this.setState({ machine: response.data });
              console.log(
                "Atribuição do GET ao estado. ",
                this.props.selectedMaquina,
                this.currentItem
              );
            });
            break;
          case "semana":
            axios
              .get("http://localhost:3001/monofio/semana")
              .then((response) => {
                console.log("Get do item selecionado: ", response.data);
                this.setState({ machine: response.data });
                console.log(
                  "Atribuição do GET ao estado. ",
                  this.props.selectedMaquina,
                  this.currentItem
                );
              });
            break;
          default:
            return;
        }
        break;
      case "LOUSADA 2000":
        return axios
          .get("http://localhost:3001/lousada2020/last")
          .then((response) => {
            console.log("Get do item selecionado: ", response.data);
            this.setState({ machine: response.data });
            console.log(
              "Atribuição do GET ao estado. ",
              this.props.selectedMaquina,
              this.currentItem
            );
          });
      case "MINORCA":
        return axios
          .get("http://localhost:3001/minorca/last")
          .then((response) => {
            console.log("Get do item selecionado: ", response.data);
            this.setState({ machine: response.data });
            console.log(
              "Atribuição do GET ao estado. ",
              this.props.selectedMaquina,
              this.currentItem
            );
          });
      case "SERRA 3500":
        return axios
          .get("http://localhost:3001/serra3500/last")
          .then((response) => {
            console.log("Get do item selecionado: ", response.data);
            this.setState({ machine: response.data });
            console.log(
              "Atribuição do GET ao estado. ",
              this.props.selectedMaquina,
              this.currentItem
            );
          });

      default:
        return;
    }
  }
  handleSelectedMaquina(param) {
    switch (param) {
      case "MONOFIO NFC 2000":
        return axios
          .get("http://localhost:3001/monofio/last")
          .then((response) => {
            console.log("Get do item selecionado: ", response.data);
            this.setState({ machine: response.data });
            console.log("Atribuição do GET ao estado. ", this.currentItem);
          });
      default:
        break;
    }
  }
  handleTempo(maquina, tempo) {
    switch (tempo) {
      case "dia":
        break;
      case "mes":
        break;
      case "semana":
      default:
        return;
    }
  }

  randomFunction = () => {
    var min = 1900;
    var max = 2200;
    let rand = min + Math.random() * (min - max);
    if (rand > 1850) {
      this.state.statusVelocidade = true;
      this.counterVelocidade++;
    }
    if (this.props.realTime)
      if (this.counterVelocidade > 10 && this.state.realTime) {
        this.counterVelocidade = 0;
        alert(
          `Velocidade em rotação crítica!!!!\nVelocidade: ${Math.round(
            rand
          )}RPM\nMensagem enviada para o telemóvel`
        );
        //função para enviar notificação via Whatsapp
        //const message = `WARNING \n ${date} \n A máquina ${this.state.selectedMaquina}, está com rotação elevada ${this.state.statusVelocidade}, verifique a máquina !!!`;
        const date = new Date();
        axios.post("http://localhost:3001/sendnotification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          data:
            "WARNING!!!\n" +
            `${date}` +
            "\nA máquina: " +
            `${this.props.selectedMaquina}` +
            " está com rotação elevada: " +
            `${Math.round(rand)}` +
            "\nVerifique a máquina!!!",
        });
        /* client.messages.create({
                from: 'whatsapp:+315937012912',
                to: 'whatsapp:+351937012912',
                body: `WARNING \n ${date} \n A máquina ${this.state.selectedMaquina}, está com rotação elevada ${this.state.statusVelocidade}, verifique a máquina !!!`
            }).then(message => console.log(message.sid));*/
      }
    return Math.round(rand);
  };

  randomFunctionCorrente = () => {
    var min = 15;
    var max = 20;
    let rand = min + Math.random() * (min - max);
    if (rand > 13) {
      this.setState({ statusCorrente: true });
    }

    return Math.round(rand);
  };

  randomFunctionKw = () => {
    var min = 0.2;
    var max = 0.35;
    let rand = min + Math.random() * min;

    return rand.toFixed(2);
  };

  handleTime = (e) => {
    const newMachine = this.state.machine.map(({ data_hora }) => {
      return (data_hora = data_hora.substring(0, 6));
    });
  };

  render() {
    const machine = this.state.machine;
    // console.log("Array máquina para ser alterado o formato da data--->", machine);
    if (this.props.realTime);
    console.log(
      "Período selecionado passado para dashboard: " + this.props.realTime
    );
    //console.log("Array a ser passado da query para const machine: ", machine);
    //console.log("Item Selecionado: ", this.state.currentItem);
    const selectedMaquina = this.props.selectedMaquina;
    // console.log("Máquina selecionada: ", this.props.selectedMaquina )
    //this.handleSelectedMaquina(this.props.selectedMaquina);
    const maquinaValues = this.renderSwitch(selectedMaquina);
   
    console.log("Valor tempo: ", this.state.timeTotal);
    let currentDate = new Date();
    //console.log(maquinaValues[0]);
    // console.log("Objecto a ser renderizado no dashboard: " + this.handleResponse(selectedMaquina));
    return (
      <>
        {machine?.map(
      ({ DateTime, Alarm, Type, Job, Power, Production, Tension }) => (
        <>
          <div className="container-dashboard-d ">
            <div className="row" eventkey={this.state.key}>
              <Card
                className={
                  "card-box-header " +
                  (Job === 4 || Job === 3 ? "blinkIdle" : "")
                }
                style={{ backgroundColor: "#E4181D", color: "#ffffff" }}
                onClick={() => this.handleSelectItem(1, "none")}
              >
                <h5>{Type.toString().toUpperCase()}</h5>
              </Card>
              <Card
                eventkey={2}
                onClick={() => this.handleSelectItem(2, "corrente")}
                className={
                  "card-box-header" +
                  (this.currentItem === "corrente" ? " active" : " ")
                }
              >
                <h6>Power</h6>
                <h2 style={{ color: "#333" }}>
                  { Job === 4  || Job === 3 ? "Standby" : Power}
                </h2>
                <h6>Ligado/Desligado</h6>
                <span
                  className={
                    "spanc" +
                    (Job === 1
                      ? " down"
                      : Job === 4 || Job === 3
                      ? " blink"
                      : " active")
                  }
                ></span>
              </Card>
              <Card
                eventkey={7}
                onClick={() => this.handleSelectItem(1, "tempo")}
                className={
                  "card-box-header" +
                  (this.currentItem === "tempo" ? " active" : " ")
                }
              >
                <h6>Tempo Ligada</h6>

                <h2 style={{ color: "#333" }}>
                  {(Type === "stonecut") ? Math.abs(currentDate.getHours().toString() -
                    this.state.timeStartCNC1?.map(({ DateTime }) => {
                      return DateTime.toString().substring(11, 13);
                    })) : Math.abs(currentDate.getHours().toString() -
                    this.state.timeStartCNC2?.map(({ DateTime }) => {
                      return DateTime.toString().substring(11, 13);
                    }))}h
                    {(Type === "stonecut") ? Math.abs(currentDate.getMinutes().toString() -
                    this.state.timeStartCNC1?.map(({ DateTime }) => {
                      return DateTime.toString().substring(14, 16);
                    })) : Math.abs(currentDate.getMinutes().toString() -
                    this.state.timeStartCNC2?.map(({ DateTime }) => {
                      return DateTime.toString().substring(14, 16);
                    })) }
                  
                </h2>
                <h6>
                  Start:{" "}
                  <b>
                    {Type === "stonecut"
                      ? this.state.timeStartCNC1?.map(({ DateTime }) => {
                          return DateTime.toString().substring(11, 16);
                        })
                      : this.state.timeStartCNC2?.map(({ DateTime }) => {
                          return DateTime.toString().substring(11, 16);
                        })}
                  </b>
                </h6>
              </Card>
              <Card
                eventkey={1}
                onClick={() => this.handleSelectItem(1, "pecas")}
                className={
                  "card-box-header col-lg col-md-6 col-sm-12" +
                  (Production === 100 ? " blinkDone" : " ")
                  
                }
                style={{maxWidth:"100%", minWidth:"320px", float:"left"}}
              >
                <h6>Produção</h6>
                <span className="badgeWork">
                  <Badge bg="danger" style={{ fontWeight: "lighter" }}>
                    #
                    {Type === "stonecut"
                      ? this.calcJob(this.state.production1)
                      : this.state.production2}
                  </Badge>
                </span>
                <h1 style={{ color: "#333" }}>{Production}%</h1>
                <h6>
                  <ProgressBar
                    animated
                    striped
                    variant={
                      Production >= 90
                        ? "success"
                        : Production <= 30
                        ? "danger"
                        : "warning"
                    }
                    now={Production}
                    //label={`${Production}%`}
                    style={{ height: "26px" }}
                  />
                </h6>
              </Card>

              <Card
                eventkey={3}
                onClick={() => this.handleSelectItem(3, "horas")}
                className={
                  "card-box-header" +
                  (this.currentItem === "horas" ? " active" : "")
                }
              >
                <h6>Trabalho</h6>
                <h1 style={{ color: "#333" }}>{Job}</h1>
                <h6>Executado</h6>
              </Card>
              <Card
                eventkey={4}
                onClick={() => this.handleSelectItem(4, "agua")}
                className={
                  "card-box-header" +
                  (this.currentItem === "agua" ? " active" : "")
                }
              >
                <h6>Tensão</h6>
                <h1 style={{ color: "#333" }}>
                  {Tension === null ? 0 : parseFloat(Tension).toFixed(0)}
                </h1>
                <h6>Volts</h6>
              </Card>
              <Card
                eventkey={5}
                onClick={() => this.handleSelectItem(5, "velocidade")}
                className={
                  "card-box-header" + (Alarm !== "Clear" ? " blink" : " ")
                }
              >
                <h6>Alarme</h6>
                {Alarm.length > 6 ? (
                  <h5 style={{ color: "#333", fontSize: 10 }}>{Alarm}</h5>
                ) : (
                  <h1 style={{ color: "#333" }}>{Alarm}</h1>
                )}

                <h6>Tipo</h6>
                <span
                  className={
                    "spanc" + (Alarm !== "Clear" ? " active" : " down")
                  }
                ></span>
              </Card>
            </div>
          </div>
        

              <MyChart
                maquina={maquinaValues}
                machine={machine}
                currentItemChart={this.currentItem}
                selectedMaquina={selectedMaquina}
                kWh={this.randomFunctionKw()}
              />
            </>
          )
        )}
      </>
    );
  }
}

export default Dashboard;
