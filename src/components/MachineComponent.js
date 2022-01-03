import './MachineComponent.css';
import Header from './HeaderComponent';
import SubHeader from './SubHeaderComponent';
import React, { Component } from 'react';
import Dashboard from './DashBoardComponent';
import DashboardGeral from './DashBoardGeral';
import './DashBoardComponent.css'
import Sidebar from './Sidebar';

class Machine extends Component {
  constructor(props) {
    super(props);

    this.state = {     
        machine : [],
        chartData : [],
        timeTotal: "",
        timePeriod: "",
        realTime: false
    }
    //this.renderMaquina = this.renderMaquina.bind(this);
    this.handleTimeback = this.handleTimeback.bind(this);
    this.handleTimePeriod = this.handleTimePeriod.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
    this.handleRealTime = this.handleRealTime.bind(this);
    this.handdleDashboard = this.handdleDashboard.bind(this);
}

handleCallback = (parentData) =>{
  this.setState({parentData})
  this.setState({machine : parentData});
  console.log("Avô: ", parentData);
  //console.log(this.renderSwitch(parentData))
}

handleTimeback = (parentData) =>{
  this.setState({parentData})
  this.state.timeTotal = parentData;
  console.log("Tempo total da máquina: ", parentData)
  /*axios.get("http://localhost:3001/monofio")
                                .then((response) => {
                                  console.log(response.data);
                                }
                                )*/
  //console.log(this.renderSwitch(parentData))
}

handleRealTime = (childData) =>{
  this.state.realTime = childData;
  this.setState({realtime: this.state.realTime});
  console.log("Real Time selecionado? ---->: ", this.state.realTime);
  return;
}

handleTimePeriod = (parentData) =>{
  this.state.timePeriod = parentData;
  this.setState({parentData});
  console.log("Tempo selecionado ---->: ", this.state.timePeriod);
  return;
  /*axios.get("http://localhost:3001/monofio")
                                .then((response) => {
                                  console.log(response.data);
                                }
                                )*/
  //console.log(this.renderSwitch(parentData))
}

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

componentDidMount() {  
      this.setState({
        timePeriod: this.state.timePeriod,
        realTime:this.state.realTime
      });
      return;    
}
handdleDashboard(value){
  console.log("HANDLE DASHBOARD", value);
  switch (value) {
    case 'MONOFIO NFC 2000' :
      case 'LOUSADA 2000': return(
    <Dashboard realTime={this.state.realTime} selectedMaquina = {this.state.machine} parentCallback = {this.handleTimeback} currentMode = {this.state.timePeriod}  />
    )
    
  
    default: return(
    <DashboardGeral realTime={this.state.realTime} selectedMaquina = {this.state.machine} parentCallback = {this.handleTimeback} currentMode = {this.state.timePeriod}  />
    )
  }
}

render(){
  
  console.log("Time período em Appjs", this.state.timePeriod);
  
      return (
          <div className="App">
         <div className="row-main">
             <div id="left">
             <Sidebar sidebarCallback = {this.handleCallback}/>
                 </div> 
                 <div id="main">
        <header className="App-header">
          <SubHeader  timeTotal = {this.state.timeTotal} timePeriod = {this.handleTimePeriod} realTime = {this.handleRealTime}/>
          <Header bigParentCallback = {this.handleCallback}  />          
        </header>
        {this.handdleDashboard(this.state.machine)}
         

        </div>
        </div>
         
         
          
      </div>
              //<Menu className="sub-menu" maquina = {this.state.maquina} onClick={console.log("Valor a ser passado para Dashboard: "+this.state.parentData)}/>
    );
  }

}

export default Machine;