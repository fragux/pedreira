import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Dropdown } from "reactstrap"

const test = () => {
state = {
    currency: '',
    dropDownOpen: '',
 }
 
 toggle = () => {
     this.setState({
        dropDownOpen: !this.state.dropDownOpen,
     })
 }
 
 handleChange = (code) => {
     this.setState({
         currency: code
     })
 }

 render()
    return(
        <ButtonDropdown >
            <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle} >
                <DropdownToggle color="primary" caret className="dropdown-toggle">
                    Select Currency
                </DropdownToggle>
                <DropdownMenu className="currency-dropdown">
                        <DropdownItem onClick={() => this.handleChange(USD)} dropDownValue="USD">USD</DropdownItem>
                        <DropdownItem onClick={() => this.handleChange(EUR)} dropDownValue="EUR">EUR</DropdownItem>
                        <DropdownItem onClick={() => this.handleChange(INR)} dropDownValue="INR">INR</DropdownItem>
                        <DropdownItem onClick={() => this.handleChange(AFT)} dropDownValue="AFT">AFT</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </ButtonDropdown>
    )
    }

    export default test;

    //TESTE APP.JS

    import logo from './logo.svg';
import './App.css';
import Header from './components/HeaderComponent';
import SubHeader from './components/SubHeaderComponent';
import Menu from './components/MenuComponent';
import {MAQUINAS} from "./data/maquina";
import {MACHINE} from "./data/machine";
import { LOUSADA } from './data/maquina';
import { Component } from 'react';
import MenuDropdown from './components/SelectComponent';
import Dashboard from './components/DashBoardComponent';
import './components/DashBoardComponent.css'
import MyChart from './components/ChartComponent';
import {Card} from 'reactstrap'
import reactCharts from 'react-charts';
import { MONOFIO } from './data/monofio';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {        
        maquina : [],
        totalHours : ""
    }
    this.renderSwitch = this.renderSwitch.bind(this)
}

handleCallback = (parentData) =>{
  this.setState({parentData})
  console.log("Avô: "+ parentData)
  //console.log(this.renderSwitch(parentData))
}

renderSwitch(param) {
  switch(param) {
    case 'MONOFIO NFC 2000':
      return (
        this.state={maquina:MONOFIO}
        );
    default:
      return (
        this.state={maquina:LOUSADA}
        );
  }
}

render(){
  const maquina = this.renderSwitch(this.parentData);
  maquina.maquina.map(
    ({ id, type, TotalHours, Hours, WaterConsumption, WireSpeed, LubrificationTimeTotal, EletricConsumption, Production }) => 
     this.totalHours = TotalHours.value);
  console.log("Time total: ", this.totalHours); 
  //console.log(maquina);
    return (
      <div className="App">
        <header className="App-header">
          <SubHeader totalHours = {this.state.totalHours} onClick={this.state.parentData} />
          <Header bigParentCallback = {this.handleCallback} />          
        </header>
          <Dashboard selectedMaquina = {this.state.parentData} onClick={this.state.parentData} />
        
          <div className="container col-12">
            <div className="row">

              <Card style={ {border:"none", marginTop:"1rem"}}><MyChart/></Card>
              
            </div>
            </div>
         
          
      </div>
              //<Menu className="sub-menu" maquina = {this.state.maquina} onClick={console.log("Valor a ser passado para Dashboard: "+this.state.parentData)}/>
    );
  }

}

export default App;
