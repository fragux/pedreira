import React, { Component } from "react";
//import { Media } from 'reactstrap';
import { ProgressBar, Badge } from "react-bootstrap";
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
import "./CncComponent.css";
import XML from "../data/relatorio.xml";
import XMLParser from "react-xml-parser";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as TbIcons from "react-icons/tb";

import { ApplicationInstance } from "twilio/lib/rest/api/v2010/account/application";
import Machine from "./MachineComponent";
//import { render } from '@testing-library/react';
//import { alignAuto } from 'react-charts/dist/react-charts.development';
//const client = require ('twilio')('AC30d90c932ea37c30c67b90ed466a24ad','d2994d9914dcabe2dd60190c96fb4b0d');

class Stonecut45mill extends Component {
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
      production1: [],
      production2: [],
      trabalhosExec: 0,
      trabalhosExec1: 0,
      standBy: false,
      isOffline: false,
      resultXML: "",
      timeStartCNC1: [],
      timeStartCNC2: [],
      alarmTrigger: "",
    };
    this.getData = this.getData.bind(this);

    this.handleSelectItem = this.handleSelectItem.bind(this);
    //this.randomFunctionCorrente = this.randomFunctionCorrente.bind(this);
    this.randomFunction = this.randomFunction.bind(this);
    //this.randomFunctionKw = this.randomFunctionKw.bind(this);
    this.props.parentCallback(this.state.timeTotal);
    this.handleResponse = this.handleResponse.bind(this);
    this.renderMachine = this.renderMachine.bind(this);
    this.calcJob = this.calcJob.bind(this);
    // this.convertXmlToJson = this.convertXmlToJson.bind(this);
    this.calcIsOffLine = this.calcIsOffLine.bind(this);
    this.calcWork = this.calcWork.bind(this);
    this.calcTimeStart = this.calcTimeStart.bind(this);
    console.log("Bot??o real time: ---->", this.props.realTime);
  }

  getData() {
    axios.get("http://localhost:3001/machine/cnc2/real").then((response) => {
      console.log(
        "Get DATA from function getData() and setInterval: ",
        response.data
      );
      this.setState({ machine1: response.data });
    });
    /*axios.get("http://localhost:3001/machine/cnc2/last").then((response) => {
      console.log(
        "Get DATA from function getData() and setInterval: ",
        response.data
      );
      this.setState({ machine1: response.data });
    });*/

    axios.get("http://localhost:3001/machine/cnc1/job").then((response) => {
      this.setState({ production1: response.data });
    });
    axios.get("http://localhost:3001/machine/cnc2/job").then((response) => {
      this.setState({ production2: response.data });
    });
    axios.get("http://localhost:3001/machine/cnc1/start").then((response) => {
      this.setState({ timeStartCNC1: response.data });
    });
    axios.get("http://localhost:3001/machine/cnc2/start").then((response) => {
      this.setState({ timeStartCNC2: response.data });
    });
    this.calcJob();
    //this.convertXmlToJson(XML);
    this.calcIsOffLine();
  }

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
    }, 30000);
  }

  calcWork = (value) => {
    if (value === 0)
      return <AiIcons.AiOutlineStop size={50} color={"#e4181d"} />;
    if (value === 1)
      return <AiIcons.AiOutlinePlayCircle size={50} color={"green"} />;
    if (value === 2)
      return <MdIcons.MdOutlineModeStandby size={50} color={"gray"} />;
    if (value === 3)
      return <AiIcons.AiOutlinePauseCircle size={50} color={"gray"} />;
    if (value === 4)
      return (
        <BiIcons.BiError size={50} color={"gray"} className="blinkOffLine" />
      );
    if (value === 5) return <TbIcons.TbReplace size={50} color={"gray"} />;
  };

  calcIsOffLine = (array) => {
    let currentDate = new Date();
    currentDate.setTime(
      currentDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
    );
    let result = new Boolean();
    array?.map(({ DateTime }) => {
      console.log(
        Math.abs(currentDate.getMinutes() - DateTime.substring(11, 13))
      );
      let diff = currentDate.getTime() - Date.parse(DateTime);
      let vmindiff = Math.floor(diff / 1000 / 60); // in minutes
      diff -= vmindiff * 1000 * 60;
      console.log(
        "Diferen??a das datas STONECUT:",
        currentDate.getTime() -
          Date.parse(
            DateTime.toString().substring(0, DateTime.toString().length - 5)
          ),
        "Convertida em minutos: ",
        vmindiff
      );
      console.log(parseInt(DateTime.substring(8, 10)));
      if (vmindiff > 10) {
        //console.log("Teste para verificar se est?? offline: ", true);
        result = true;
      } else result = false;

      //return this.setState({isOffline: true});
    });
    return result;
  };

  calcTimeStart = (array) => {
    const currentDate = new Date();
    console.log(
      "Tipo de timeZone: ",
      Math.abs(currentDate.getTimezoneOffset())
    );
    //currentDate.setTime( currentDate.getTime() - new Date().getTimezoneOffset()*60*1000 );
    let result = 0;
    let horas = 0;
    let minutos = 0;
    result = array?.map(({ DateTime }) => {
      //console.log( Math.abs(currentDate.getMinutes() - DateTime.substring(11, 13)));
      //console.log("Tipo de timeZone BD: ", Math.abs(Date.parse(DateTime).getTimezoneOffset()))
      let diff = currentDate.getTime() - Date.parse(DateTime);
      let vmindiff = Math.floor(diff / 1000 / 60); // in minutes
      diff -= vmindiff * 1000 * 60;
      console.log(
        "Diferen??a das datas :",
        currentDate.getTime() - Date.parse(DateTime),
        "Convertida em minutos: ",
        vmindiff
      );
      return vmindiff;
    });
    horas = Math.round(result / 60);
    minutos = result - Math.floor((result / 60) % 2) * 60;
    minutos = (((minutos.toFixed(0) / 60) % 2) * 60).toFixed(0);
    // console.log("Minutos: ", minutos  , "Tamanho dos minutos: ", minutos.toFixed(0).toString().length);

    if (minutos.length === 1) {
      return `${horas}h0${minutos}`;
    } else if (minutos.length === 3) {
      return `${horas}h${minutos}`;
    } else return `${horas}h${minutos}`;
  };

  convertXmlToJson = (xmlString) => {
    axios
      .get(xmlString, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        //console.log('Your xml file as string', response.data);
        this.setState({ resultXML: response.data });
      });
    var jsonData = new XMLParser().parseFromString(this.state.resultXML);
    console.log("PARSER - TESTE -> ", jsonData);
    //var jsonData = new XMLParser().parseFromString(XMLDATA);
    /*for (const result of XMLDATA.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
        const key = result[1] || result[3];
        const value = result[2] && this.convertXmlToJson(result[2]); //recusrion
        jsonData[key] = ((value && Object.keys(value).length) ? value : result[2]) || null;
    }*/
    // return jsonData;
  };

  handleResponse = (parentData) => {
    this.props.parentCallback(this.state.timeTotal);
    console.log("Tempo total callback", this.state.timeTotal);
    this.setState({ selectedMaquina: parentData });
    console.log("Dashboard: " + parentData);
    console.log(this.renderSwitch(parentData));
    const maquinaValues = this.renderSwitch(parentData);
    console.log(maquinaValues.maquina);
  };

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
                "Atribui????o do GET ao estado. ",
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
                "Atribui????o do GET ao estado. ",
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
                  "Atribui????o do GET ao estado. ",
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
              "Atribui????o do GET ao estado. ",
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
              "Atribui????o do GET ao estado. ",
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
              "Atribui????o do GET ao estado. ",
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
            console.log("Atribui????o do GET ao estado. ", this.currentItem);
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
    this.state.machine1?.map((item) => {
      console.log("Trigger para notifica????o", item.Alarms);
      if (
        item.Alarms !== "Clear" &&
        item.Alarms.substring(5, 6) !== "0" &&
        this.state.alarmTrigger !== item.Alarms
      ) {
        axios.post("http://localhost:3001/sendnotification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          data: `\nNOTIFICA????O \nOR - APP\n\n${item.DateTime}\n\nA m??quina: ${item.MachineID}\n\nest?? com o seguinte erro: ${item.Alarms}\n\nVerifique o estado da m??quina.`,
        });
        axios.post("http://localhost:3001/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          data: `\nNOTIFICA????O \nOR - APP\n\n${item.DateTime}\n\nA m??quina: ${item.MachineID}\n\nest?? com o seguinte erro: ${item.Alarms}\n\nVerifique o estado da m??quina.`,
        });




        this.setState({ alarmTrigger: item.Alarms });
      }
    });

    if (this.props.realTime)
      if (this.counterVelocidade > 10 && this.state.realTime) {
        this.counterVelocidade = 0;
        alert(
          `Velocidade em rota????o cr??tica!!!!\nVelocidade: ${Math.round(
            rand
          )}RPM\nMensagem enviada para o telem??vel`
        );
        //fun????o para enviar notifica????o via Whatsapp
        //const message = `WARNING \n ${date} \n A m??quina ${this.state.selectedMaquina}, est?? com rota????o elevada ${this.state.statusVelocidade}, verifique a m??quina !!!`;
        const date = new Date();
        axios.post("http://localhost:3001/sendnotification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          data:
            "WARNING!!!\n" +
            `${date}` +
            "\nA m??quina: " +
            `${this.props.selectedMaquina}` +
            " est?? com rota????o elevada: " +
            `${Math.round(rand)}` +
            "\nVerifique a m??quina!!!",
        });
        /* client.messages.create({
                from: 'whatsapp:+315937012912',
                to: 'whatsapp:+351937012912',
                body: `WARNING \n ${date} \n A m??quina ${this.state.selectedMaquina}, est?? com rota????o elevada ${this.state.statusVelocidade}, verifique a m??quina !!!`
            }).then(message => console.log(message.sid));*/
      }
    return;
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

  calcJob = (array) => {
    const initialValue = 0;
    var result = array?.reduce(
      (previousData, currentData) => (previousData - currentData) % 5,
      initialValue
    );

    console.log("Calculo dos trabalhos realizados: ", result);
    return array;
  };

  renderMachine = (machine) => {
    let currentDate = new Date();
    return machine?.map(
      ({
        DateTime,
        Alarms,
        MachineID,
        OnOffJob,
        OnOffAlimentacao,
        ProducaoAtual,
        Tensao,
      }) => (
        <>
          <div className="container-dashboard-d ">
            <div className="row" eventkey={this.state.key}>
              <Card
                className={
                  "card-box-header blinkPlay" +
                  (OnOffJob === 4 || OnOffJob === 3 ? "blinkIdle" : "")
                }
                style={{ backgroundColor: "green", color: "#ffffff" }}
                onClick={() => this.handleSelectItem(1, "none")}
              >
                <h5>{MachineID.toString().toUpperCase()}</h5>
              </Card>
              <Card
                eventkey={2}
                //onClick={() => this.handleSelectItem(2, "corrente")}
                className={
                  "card-box-header" +
                  (this.currentItem === "corrente" ? " active" : " ")
                }
              >
                <h6>Power</h6>
                <h2 style={{ color: "#333" }}>
                  {OnOffJob === 4 || OnOffJob === 3
                    ? "Standby"
                    : OnOffAlimentacao}
                </h2>
                <h6>Ligado/Desligado</h6>
                <span
                  className={
                    "spanc" +
                    (OnOffJob === 1
                      ? " down"
                      : OnOffJob === 4 || OnOffJob === 3
                      ? " blink"
                      : " active")
                  }
                ></span>
              </Card>
              <Card
                eventkey={7}
                //onClick={() => this.handleSelectItem(1, "tempo")}
                className={
                  "card-box-header" +
                  (this.currentItem === "tempo" ? " active" : " ")
                }
              >
                <h6>Tempo Ligada</h6>

                <h2 style={{ color: "#333" }}>
                  {MachineID === "stonecut"
                    ? this.calcTimeStart(this.state.timeStartCNC1)
                    : this.calcTimeStart(this.state.timeStartCNC2)}
                </h2>
                <h6>
                  Start:{" "}
                  <b>
                    {MachineID === "stonecut"
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
                // onClick={() => this.handleSelectItem(1, "pecas")}
                className={
                  "card-box-header col-lg col-md-6 col-sm-12" +
                  (ProducaoAtual === 100 ? " blinkDone" : " ")
                }
                style={{ maxWidth: "100%", minWidth: "320px", float: "left" }}
              >
                <h6>Produ????o</h6>
                <span className="badgeWork">
                  <Badge bg="danger" style={{ fontWeight: "lighter" }}>
                    {`# `}
                    {MachineID === "stonecut"
                      ? this.calcJob(this.state.production1).length
                      : this.state.production2.length}
                  </Badge>
                </span>
                <h1 style={{ color: "#333" }}>{ProducaoAtual}%</h1>
                <h6>
                  <ProgressBar
                    animated
                    striped
                    variant={
                      ProducaoAtual >= 90
                        ? "success"
                        : ProducaoAtual <= 30
                        ? "danger"
                        : "warning"
                    }
                    now={ProducaoAtual}
                    //label={`${Production}%`}
                    style={{ height: "26px" }}
                  />
                </h6>
              </Card>

              <Card
                eventkey={3}
                //onClick={() => this.handleSelectItem(3, "horas")}
                className={
                  "card-box-header" +
                  (this.currentItem === "horas" ? " active" : "")
                }
              >
                <h6>Trabalho</h6>
                <h1 style={{ color: "#333" }}>
                  {Alarms !== "Clear"
                    ? this.calcWork(4)
                    : OnOffJob === 4
                    ? this.calcWork(5)
                    : this.calcWork(OnOffJob)}
                </h1>
                <h6>Estado</h6>
              </Card>
              <Card
                eventkey={4}
                //onClick={() => this.handleSelectItem(4, "agua")}
                className={
                  "card-box-header" +
                  (this.currentItem === "agua" ? " active" : "")
                }
              >
                <h6>Tens??o</h6>
                <h1 style={{ color: "#333" }}>
                  {Tensao === null ? 0 : parseFloat(Tensao).toFixed(0)}
                </h1>
                <h6>Volts</h6>
              </Card>
              <Card
                eventkey={5}
                // onClick={() => this.handleSelectItem(5, "velocidade")}
                className={
                  "card-box-header" + (Alarms !== "Clear" ? " blink" : " ")
                }
              >
                <h6>Alarme</h6>
                {Alarms.length > 6 ? (
                  <h4 style={{ color: "#333", fontSize: 10 }}>
                    {Alarms.substring(5, Alarms.length)}
                  </h4>
                ) : (
                  <h1 style={{ color: "#333" }}>{Alarms}</h1>
                )}

                <h6>Tipo</h6>
                <span
                  className={
                    "spanc" + (Alarms !== "Clear" ? " active" : " down")
                  }
                ></span>
              </Card>
            </div>
          </div>
        </>
      )
    );
  };

  render() {
    this.randomFunction();
    return (
      <>
        {
          !this.calcIsOffLine(this.state.machine)
            ? this.renderMachine([
                {
                  DateTime: new Date(),
                  Alarms: (
                    <HiIcons.HiOutlineStatusOffline
                      size={40}
                      className="blinkOffLine"
                    />
                  ),
                  MachineID: "STONECUT",
                  OnOffJob: 0,
                  OnOffAlimentacao: (
                    <MdIcons.MdOutlinePowerOff
                      size={40}
                      className="blinkOffLine"
                    />
                  ),
                  ProducaoAtual: 0,
                  Tensao: 0,
                },
              ])
            : this.renderMachine(
                this.state.machine
              ) /*this.renderMachine(this.state.machine?.slice(1))*/
        }

        {
          !this.calcIsOffLine(this.state.machine1)
            ? this.renderMachine([
                {
                  DateTime: new Date(),
                  Alarms: (
                    <HiIcons.HiOutlineStatusOffline
                      size={40}
                      className="blinkOffLine"
                    />
                  ),
                  MachineID: "STONECUT45MILL",
                  OnOffJob: 0,
                  OnOffAlimentacao: (
                    <MdIcons.MdOutlinePowerOff
                      size={40}
                      className="blinkOffLine"
                    />
                  ),
                  ProducaoAtual: 0,
                  Tensao: 0,
                },
              ])
            : this.renderMachine(
                this.state.machine1
              ) /*this.renderMachine(this.state.machine?.slice(1))*/
        }
      </>
    );
  }
}

export default Stonecut45mill;
