import React, { Component } from "react";
//import { Media } from 'reactstrap';
import {
  Card,
  /* CardTitle,
  CardBody,
  CardText*/
} from "reactstrap";
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
      machine1: [],
      timeTotal: "",
      timePeriod: this.props.currentMode,
      corrente: "",
      velocidade: "",
      realTime: this.props.realTime,
      statusCorrente: false,
      statusVelocidade: false,
      api: this.props.api,
      endPoint: this.props.endPoint,
    };
    this.getData = this.getData.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.randomFunctionCorrente = this.randomFunctionCorrente.bind(this);
    this.randomFunction = this.randomFunction.bind(this);
    this.randomFunctionKw = this.randomFunctionKw.bind(this);
    this.props.parentCallback(this.state.timeTotal);
    this.handleResponse = this.handleResponse.bind(this);
    this.renderMachine = this.renderMachine.bind(this);
    console.log("Botão real time: ---->", this.props.realTime);
  }

  getData() {
    axios.get("http://localhost:3001/machine/cnc1/last").then((response) => {
      console.log(
        "Get DATA from function getData() and setInterval: ",
        response.data
      );
      this.setState({ machine: response.data });
    });
    axios.get("http://localhost:3001/machine/cnc2/last").then((response) => {
      console.log(
        "Get DATA from function getData() and setInterval: ",
        response.data
      );
      this.setState({ machine1: response.data });
    });
  }

  componentDidMount() {
    this.setState({
      machine: this.machine,
      timeTotal: this.state.timeTotal,
      realTime: this.props.realTime,
      api: "http://localhost:3001/",
      endPoint: "machine/cnc1/last",
    });
    console.log("teste api + endpoint", this.state.api, this.state.endPoint);
    //this.getData();
    setInterval(this.getData(), 300000);
    /*if (this.props.realTime)
        this.setState((prevState) => {
          return {
            corrente: this.randomFunctionCorrente(),
            velocidade: this.randomFunction(),
          };
        });*/
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
            this.setState({ endPoint: "/monofio/dia" });
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

  renderMachine = (machine) => {
    return (
        machine?.map(
      ({ DateTime, Alarm, Type, Job, Power, Production, Tension }) => (
        <>
          <div className="container-dashboard-d col-12 ">
            <div className="row-dashboard" eventkey={this.state.key}>
              <Card
                className="card-box-header col-md-3"
                style={{ backgroundColor: "#E4181D", color: "#ffffff" }}
                onClick={() => this.handleSelectItem(1, "none")}
              >
                
                <h5 style={{ backgroundColor: "#E4181D", color: "#ffffff" }}>
                  {Type.toString().toUpperCase()}
                </h5>
              </Card>
              <Card
                eventkey={7}
                onClick={() => this.handleSelectItem(1, "tempo")}
                className={
                  "card-box-header" +
                  (this.currentItem === "tempo" ? " active" : " ")
                }
              >
                <h6>Data</h6>
                <h6 style={{ color: "#333" }}><b>{DateTime.toString().substring(0,10)}</b></h6>
                <h6 style={{ color: "#333" }}>{DateTime.toString().substring(11,16)}</h6>
                <h6>Última leitura </h6>
              </Card>
              <Card
                eventkey={1}
                onClick={() => this.handleSelectItem(1, "pecas")}
                className={
                  "card-box-header" +
                  (this.currentItem === "pecas" ? " active" : " ")
                }
              >
                <h6>Production</h6>
                <h1 style={{ color: "#333" }}>{Production}%</h1>
                <h6>UNI </h6>
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
                <h1 style={{ color: "#333" }}>{Power} </h1>
                <h6>Ligado/Desligado</h6>
                <span
                  className={"spanc" + (Power === "On" ? " down" : " active")}
                ></span>
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
                  "card-box-header" +
                  (this.currentItem === "velocidade" ? " active" : " ")
                }
              >
                <h6>Alarme</h6>
                <h1 style={{ color: "#333" }}>{Alarm}</h1>
                <h6>Tipo</h6>
                <span
                  className={"spanc" + (Alarm != "Clear" ? " active" : " down")}
                ></span>
              </Card>
            </div>
          </div>
        </>
      )
    ));
  };

  render() {
    //const maquinaValues = this.state.machine;
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
    //const maquinaValues = this.renderSwitch(selectedMaquina);
    /*const values = maquinaValues.maquina.map(
      ({
        id,
        type,
        TotalHours,
        Hours,
        WaterConsumption,
        WireSpeed,
        LubrificationTimeTotal,
        EletricConsumption,
        Production,
      }) =>
        `Id da maquina: ${id}
            Tipo: ${type}
            Total horas: ${(this.state.timeTotal = TotalHours.value)}
            Horas: ${Hours.value}
            Peças Produzidas: ${Production.value}
            Consumo de Água: ${WaterConsumption.value}
            Consumo Elétrico:${EletricConsumption.value}
            Velocidade do Fio:${WireSpeed.value}
            Tempo Lubrificação:${LubrificationTimeTotal.value}
            `
    );*/

    //console.log(values);
    console.log("Valor tempo: ", this.state.timeTotal);

    //console.log(maquinaValues[0]);
    // console.log("Objecto a ser renderizado no dashboard: " + this.handleResponse(selectedMaquina));
    return <>
        {this.renderMachine(this.state.machine?.slice(1))}
        <p></p>
        
        {this.renderMachine(this.state.machine1)}
            </>;
        
  }
}

export default Dashboard;
