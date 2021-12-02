//import logo from './logo.svg';
import './App.css';
import Header from './components/HeaderComponent';
import SubHeader from './components/SubHeaderComponent';
//import Menu from './components/MenuComponent';
import { MACHINE } from './data/machine';
import { LOUSADA } from './data/maquina';
import {DEFAULT} from './data/default';
import { Component } from 'react';
//import MenuDropdown from './components/SelectComponent';
import Dashboard from './components/DashBoardComponent';
import './components/DashBoardComponent.css'
//import MyChart from './components/ChartComponent';
//import {Card} from 'reactstrap'
//import reactCharts from 'react-charts';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {        
        machine : [],
        chartData : [],
        timeTotal: this.props.parentData
    }
    this.renderMaquina = this.renderMaquina.bind(this);
    //this.handleTimeback = this.handleTimeback.bind(this);
}

handleCallback = (parentData) =>{
  this.setState({parentData})
  console.log("Avô: ", parentData)
  //console.log(this.renderSwitch(parentData))
}

handleTimeback = (parentData) =>{
  //this.setState({parentData})
  console.log("Tempo total da máquina: ", parentData)
  this.state.timeTotal = parentData;
  //console.log(this.renderSwitch(parentData))
}

renderMaquina(param) {
  switch(param) {
    case 'MONOFIO NFC 2000':
      return (
        this.setState={machine:MACHINE}
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
      this.timeTotal = TotalHours.value;
      console.log("Time total: ", this.timeTotal)
    }); 
    
  return(this.timeTotal);

}
componentDidMount() {
  this.setState({
      timeTotal: this.timeTotal
  })
}

render(){
  //const machine = this.renderMaquina(this.parentData);
  //this.renderTimeTotal()
  
      return (
      <div className="App">
        <header className="App-header">
          <SubHeader  timeTotal = {this.state.timeTotal} onClick={this.state.timeTotal} />
          <Header bigParentCallback = {this.handleCallback} />          
        </header>
          <Dashboard selectedMaquina = {this.state.parentData} parentCallback = {this.handleTimeback} onClick={this.state.parentData} />
        
         
         
          
      </div>
              //<Menu className="sub-menu" maquina = {this.state.maquina} onClick={console.log("Valor a ser passado para Dashboard: "+this.state.parentData)}/>
    );
  }

}

export default App;
