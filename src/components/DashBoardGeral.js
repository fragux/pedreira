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
import MyChart from "./DashChartComponent";
//import { Chart } from 'react-charts/dist/react-charts.development';
import "./DashBoardComponent.css";
import "./DashBoardGeral.css";
import axios from "axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";
//import { render } from '@testing-library/react';
//import { alignAuto } from 'react-charts/dist/react-charts.development';
//const client = require ('twilio')('AC30d90c932ea37c30c67b90ed466a24ad','d2994d9914dcabe2dd60190c96fb4b0d');

class DashboardGeral extends Component {
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
      api : "",
      endPoint: ""
    };
    this.renderSwitch = this.renderSwitch.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.randomFunctionCorrente = this.randomFunctionCorrente.bind(this);
    this.randomFunction = this.randomFunction.bind(this);
    this.props.parentCallback(this.state.timeTotal);
    this.handleResponse = this.handleResponse.bind(this);
    console.log("Botão real time: ---->", this.props.realTime);
    this.getData = this.getData.bind(this);
  }
  getData = () => {
    
    /*axios.get(this.state.api + this.state.endPoint).then((response) => {
              console.log("Get DATA from function getData() and setInterval: ", response.data);
              this.setState({ machine: response.data });
              console.log(
                "Atribuição do GET ao estado. ",
                this.props.selectedMaquina,
                this.currentItem
              );
            });*/
            return console.log("API -> ", this.state.api);
  }

  async componentDidMount() {
    this.setState({
      machine: this.machine,
      timeTotal: this.state.timeTotal,
      realTime: this.props.realTime,
      api: "http://localhost:3001/",
      endPoint: "monofio/dia"
    });
    this.getData();
    setInterval(() => {
      if (this.props.realTime)
        this.setState((prevState) => {
          return {
            corrente: this.randomFunctionCorrente(),
            velocidade: this.randomFunction(),
          };
        });
    }, 222500);
  }

  handleResponse = (parentData) => {
    this.props.parentCallback(this.state.timeTotal);
    console.log("Tempo total callback", this.state.timeTotal);
    this.setState(parentData);
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
    /*if (this.props.realTime)
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
        });*/
        /* client.messages.create({
                        from: 'whatsapp:+315937012912',
                        to: 'whatsapp:+351937012912',
                        body: `WARNING \n ${date} \n A máquina ${this.state.selectedMaquina}, está com rotação elevada ${this.state.statusVelocidade}, verifique a máquina !!!`
                    }).then(message => console.log(message.sid));
      }
    return Math.round(rand);*/
  };

  randomFunctionCorrente = () => {
    var min = 15;
    var max = 20;
    let rand = min + Math.random() * (min - max);
    if (rand > 13) {
      this.state.statusCorrente = true;
    }

    return Math.round(rand);
  };

  handleTime = (e) => {};
  renderMaquina(maquinaValues) {
    const machine = this.state.machine;
    return (
      <>
        {maquinaValues.maquina.map(
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
          }) => (
            <>
              <TransitionGroup>
                <CSSTransition classNames="page" timeout={500}>
                  <div className="geral">
                    <div className="maquina">
                      <div id="parametros">
                        <Card
                          eventkey={1}
                          onClick={() => this.handleSelectItem(1, "pecas")}
                          className={
                            "card-box-header" +
                            (this.currentItem === "pecas" ? " active" : " ")
                          }
                        >
                          <h6>Peças Produzidas</h6>
                          <h1 style={{ color: "#333" }}>{Production.value}</h1>
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
                          <h6>Consumo Elétrico </h6>
                          <h1 style={{ color: "#333" }}>
                            {this.randomFunctionCorrente()}{" "}
                          </h1>
                          <h6>Amperes</h6>
                          <span
                            className={
                              "spanc" +
                              (this.state.statusCorrente === true
                                ? " active"
                                : " down")
                            }
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
                          <h6>Funcionamento</h6>
                          <h1 style={{ color: "#333" }}>{Hours.value}</h1>
                          <h6>Horas</h6>
                        </Card>
                        <Card
                          eventkey={4}
                          onClick={() => this.handleSelectItem(4, "agua")}
                          className={
                            "card-box-header" +
                            (this.currentItem === "agua" ? " active" : "")
                          }
                        >
                          <h6>Consumo Água</h6>
                          <h1 style={{ color: "#333" }}>
                            {WaterConsumption.value}
                          </h1>
                          <h6>Litros</h6>
                        </Card>
                        <Card
                          eventkey={5}
                          onClick={() => this.handleSelectItem(5, "velocidade")}
                          className={
                            "card-box-header" +
                            (this.currentItem === "velocidade"
                              ? " active"
                              : " ")
                          }
                        >
                          <h6>Velocidade FIO</h6>
                          <h1 style={{ color: "#333" }}>
                            {this.randomFunction()}
                          </h1>
                          <h6>RPM</h6>
                          <span
                            className={
                              "spanc" +
                              (this.state.statusVelocidade === true
                                ? " active"
                                : " down")
                            }
                          ></span>
                        </Card>
                        <Card
                          eventkey={6}
                          onClick={() => this.handleSelectItem(6, "lubri")}
                          className={
                            "card-box-header" +
                            (this.currentItem === "lubri" ? " active" : "")
                          }
                        >
                          <h6>Lubrificação</h6>
                          <h1 style={{ color: "#333" }}>
                            {LubrificationTimeTotal.value}
                          </h1>
                          <h6>Horas</h6>
                        </Card>
                        <MyChart
                          maquina={maquinaValues}
                          machine={machine}
                          currentItemChart={this.currentItem}
                        />
                      </div>
                      <div id="id">
                        <div className="nome">{id}</div>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </>
          )
        )}
      </>
    );
  }

  render() {
    const machine = this.state.machine;
    if (this.props.realTime);
    console.log(
      "Período selecionado passado para dashboard: " + this.props.realTime
    );
    //console.log("Array a ser passado da query para const machine: ", machine);
    //console.log("Item Selecionado: ", this.state.currentItem);
    const selectedMaquina = this.props.selectedMaquina;
    console.log("Máquina selecionada: ", this.props.selectedMaquina);
    //this.handleSelectedMaquina(this.props.selectedMaquina);
    const MONOFIO = this.renderSwitch("MONOFIO NFC 2000");
    const LOUSADA = this.renderSwitch("LOUSADA 2000");
    const MINORCA = this.renderSwitch("MINORCA");
    const SERRA = this.renderSwitch("SERRA 3500");
    /*const values = maquinaValues.maquina.map(
                ({ id, type, TotalHours, Hours, WaterConsumption, WireSpeed, LubrificationTimeTotal, EletricConsumption, Production }) => 
                `Id da maquina: ${id}
                Tipo: ${type}
                Total horas: ${this.state.timeTotal = TotalHours.value}
                Horas: ${Hours.value}
                Peças Produzidas: ${Production.value}
                Consumo de Água: ${WaterConsumption.value}
                Consumo Elétrico:${EletricConsumption.value}
                Velocidade do Fio:${WireSpeed.value}
                Tempo Lubrificação:${LubrificationTimeTotal.value}
                `)
                
                console.log(values);
                console.log("Valor tempo: ", this.state.timeTotal);*/

    //console.log(maquinaValues[0]);
    // console.log("Objecto a ser renderizado no dashboard: " + this.handleResponse(selectedMaquina));
    return (
      <>
        <div className="geral">{this.renderMaquina(MONOFIO)}</div>
        <div className="geral">{this.renderMaquina(LOUSADA)}</div>
        <div className="geral">{this.renderMaquina(MINORCA)}</div>
        <div className="geral">{this.renderMaquina(SERRA)}</div>
      </>
    );
  }
}

export default DashboardGeral;
