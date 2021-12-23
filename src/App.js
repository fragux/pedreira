//import logo from './logo.svg';
import './App.css';
import Header from './components/HeaderComponent';
import SubHeader from './components/SubHeaderComponent';
//import Menu from './components/MenuComponent';
import { MACHINE } from './data/machine';
import { LOUSADA } from './data/maquina';
import {DEFAULT} from './data/default';
import React, { Component } from 'react';
//import MenuDropdown from './components/SelectComponent';
import Dashboard from './components/DashBoardComponent';
import './components/DashBoardComponent.css'
//import MyChart from './components/ChartComponent';
//import {Card} from 'reactstrap'
//import reactCharts from 'react-charts';
import axios from 'axios';



class App extends Component {
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
}

handleCallback = (parentData) =>{
  this.setState({parentData})
  this.state.machine = parentData;
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

render(){
  this.state.realTime = this.state.realTime;
  console.log("Time período em Appjs", this.state.realTime);
  
      return (
      <div className="App">
        <header className="App-header">
          <SubHeader  timeTotal = {this.state.timeTotal} timePeriod = {this.handleTimePeriod} realTime = {this.handleRealTime}/>
          <Header bigParentCallback = {this.handleCallback}  />          
        </header>
          <Dashboard realTime={this.state.realTime} selectedMaquina = {this.state.machine} parentCallback = {this.handleTimeback} currentMode = {this.state.timePeriod}  />
        
         
         
          
      </div>
              //<Menu className="sub-menu" maquina = {this.state.maquina} onClick={console.log("Valor a ser passado para Dashboard: "+this.state.parentData)}/>
    );
  }

}

export default App;
