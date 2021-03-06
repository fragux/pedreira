import "./MachineComponent.css";
import Header from "./HeaderComponent";
import SubHeader from "./SubHeaderComponent";
import React, { Component } from "react";
import Dashboard from "./DashBoardComponent";
import DashboardGeral from "./DashBoardGeral";
import CNC from "./CncComponent";
import LousadaMinorca from "./LousadaMinorcaComponent";
import Stonecut from "./StonecutComponent";
import Stonecut45mill from "./Stonecut45millComponent";
import CNCDashBoard from "./CncDashboardComponent";
import LousadaMinorcaDashBoard from "./LousadaMinorcaDashboard";
import "./DashBoardComponent.css";
import Sidebar from "./Sidebar";
import LoadingSpinner from "./LoadingSpinner";

class Machine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machine: [],
      chartData: [],
      timeTotal: "",
      timePeriod: "dia",
      api: "",
      endpoint: "",
      realTime: false,
      isLoading: false
    };
    //this.renderMaquina = this.renderMaquina.bind(this);
    this.handleTimeback = this.handleTimeback.bind(this);
    this.handleTimePeriod = this.handleTimePeriod.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
    this.handleRealTime = this.handleRealTime.bind(this);
    this.handdleDashboard = this.handdleDashboard.bind(this);
  }

  handleCallback = (parentData) => {
    this.setState({ parentData });
    this.setState({ machine: parentData });
    console.log("Avô: ", parentData);
    //console.log(this.renderSwitch(parentData))
  };

  handleTimeback = (parentData) => {
    this.setState({ parentData });
    this.setState({timeTotal : parentData});
    console.log("Tempo total da máquina: ", parentData);
    /*axios.get("http://localhost:3001/monofio")
                                .then((response) => {
                                  console.log(response.data);
                                }
                                )*/
    //console.log(this.renderSwitch(parentData))
  };

  handleRealTime = (childData) => {

    this.setState({ realtime: childData });
    console.log("Real Time selecionado? ---->: ", this.state.realTime);
    return;
  };

  handleTimePeriod = (parentData) => {
    this.state.timePeriod = parentData;
    this.setState({ parentData });
    console.log("Tempo selecionado ---->: ", this.state.timePeriod);
    return;
    /*axios.get("http://localhost:3001/monofio")
                                .then((response) => {
                                  console.log(response.data);
                                }
                                )*/
    //console.log(this.renderSwitch(parentData))
  };

  /*renderMaquina(param) {
  switch(param) {
    case 'MONOFIO NFC 2000':
      return (
        this.setState={machine:axios.get("http://localhost:3001:/monofio")
                                .then((response) => {
                                  console.log(response.data);
                                }
                                )}
        );
    case 'LOUSADA 2000':
      return (
        this.state={machine:LOUSADA}
        );
    default:
      return (
        this.state={machine:DEFAULT}
        );
  }
}
renderTimeTotal(parentData){
  this.renderMaquina(parentData).machine.map(
    ({id, TotalHours}) => {
      this.state.timeTotal = TotalHours.value;
      console.log("Time total: ", this.timeTotal)
      this.handleTimeback(TotalHours.value);
      this.setState({timeTotal:TotalHours.value});
    }); 
    
  return(this.timeTotal);

}*/

  async componentDidMount() {
    setInterval( () => this.setState({
      timePeriod: this.state.timePeriod,
      realTime: this.state.realTime,
      isLoading: false
    }), 5000)
    this.setState({isLoading: true});
  }

  handdleDashboard(value) {
    console.log("HANDLE DASHBOARD", value);
    switch (value) {
      case "MONOFIO NFC 2000":
      case "LOUSADA 2000":
        return (
          <Dashboard
            realTime={this.state.realTime}
            selectedMaquina={this.state.machine}
            parentCallback={this.handleTimeback}
            currentMode={this.state.timePeriod}
          />
        );
        case "STONECUT":
      case "STONECUT45MILL":
        return (
          <CNCDashBoard
              //realTime={this.state.realTime}
              selectedMaquina={this.state.machine}
              //parentCallback={this.handleTimeback}
              currentMode={this.state.timePeriod}
            />
        );
        case "LOUSADA":
          case "MINORÇA":
            return (
              <LousadaMinorcaDashBoard
                  //realTime={this.state.realTime}
                  selectedMaquina={this.state.machine}
                  //parentCallback={this.handleTimeback}
                  currentMode={this.state.timePeriod}
                />
            );
      default:
        return (
          <>
            {" "}
            <CNC
              realTime={this.state.realTime}
              selectedMaquina={this.state.machine}
              parentCallback={this.handleTimeback}
              currentMode={this.state.timePeriod}
            />
            <Stonecut
              realTime={this.state.realTime}
              selectedMaquina={this.state.machine}
              parentCallback={this.handleTimeback}
              currentMode={this.state.timePeriod}
            />
            <Stonecut45mill
              realTime={this.state.realTime}
              selectedMaquina={this.state.machine}
              parentCallback={this.handleTimeback}
              currentMode={this.state.timePeriod}
            />
            <LousadaMinorca
              realTime={this.state.realTime}
              selectedMaquina={this.state.machine}
              parentCallback={this.handleTimeback}
              currentMode={this.state.timePeriod}
            />
          </>
        );
      /*
      default:
        return (
          <DashboardGeral
            realTime={this.state.realTime}
            selectedMaquina={this.state.machine}
            parentCallback={this.handleTimeback}
            currentMode={this.state.timePeriod}
          />
        );*/
    }
  }

  render() {
    console.log("Time período em Appjs", this.state.timePeriod);

    return (
      <div className="App">
        <div className="row-main">
          <div id="left">
            <Sidebar sidebarCallback={this.handleCallback} />
          </div>
          <div id="main">
            <div className="container-top col-12 m-0">
              <header className="App-header-m">
                <Header bigParentCallback={this.handleCallback} />
                <SubHeader
                  timeTotal={this.state.timeTotal}
                  timePeriod={this.handleTimePeriod}
                  realTime={this.handleRealTime}
                />
              </header>
            </div>
            <div className="container-body">
              {this.state.isLoading ? <LoadingSpinner /> : this.handdleDashboard(this.state.machine)}
            </div>
          </div>
        </div>
      </div>
      //<Menu className="sub-menu" maquina = {this.state.maquina} onClick={console.log("Valor a ser passado para Dashboard: "+this.state.parentData)}/>
    );
  }
}

export default Machine;
