import React, { Component } from 'react';
//import { Media } from 'reactstrap';
import { 
  Card,
 /* CardTitle,
  CardBody,
  CardText*/
} from 'reactstrap';
import { MACHINE } from '../data/machine';
import { LOUSADA } from '../data/maquina';
import {DEFAULT} from '../data/default';
/*import DropdownMaquina from './DropDownMaquina';
import ListaComponent from './ListaComponent';
import Menu from './SelectComponent';*/
import MyChart from './ChartComponent';
//import { Chart } from 'react-charts/dist/react-charts.development';
import './DashBoardComponent.css'



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            selectedMaquina: this.props.selectedMaquina,
            maquinaValues: MACHINE,
            isClicked: false,
            currentItem: "",
            key: 1,
            timeTotal: ""
        }
        //this.renderSwitch.bind(this.props.selectedMaquina)      
        console.log("Menu maquina: " + this.state.selectedMaquina);       
          
    }

    handleResponse = (parentData) =>{
        //this.setState(parentData)
        console.log("Dashboard: "+ parentData)
        console.log(this.renderSwitch(parentData))
        const maquinaValues = this.renderSwitch(parentData);
        console.log(maquinaValues.maquina);
      }

      renderSwitch(param) {
        switch(param) {
          case 'MONOFIO NFC 2000':
            return (
              this.state={maquina:MACHINE}
              );
          case 'LOUSADA 2000':
            return (
              this.state={maquina:LOUSADA}
              );
          default:
            return (
              this.state={maquina:DEFAULT}
              );
        }
      }

      handleSelectItem(key, dashboardItem){
        console.log('Dashboard button:', dashboardItem);
        //this.getTimePeriod(timePeriod);
        this.currentItem=dashboardItem;
        this.setState({isClicked:true});
        //props.parentCallback(this.state.timeTotal)
    }

    

    render() {
      
      const selectedMaquina = this.props.selectedMaquina;
      const maquinaValues = this.renderSwitch(selectedMaquina);
      const values = maquinaValues.maquina.map(
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
      console.log("Valor tempo: "+ this.state.timeTotal);
      this.props.parentCallback(this.state.timeTotal);
      //console.log(maquinaValues[0]);
       // console.log("Objecto a ser renderizado no dashboard: " + this.handleResponse(selectedMaquina));
        return (          
            <>           
            
           {maquinaValues.maquina.map(
        ({ id, type, TotalHours, Hours, WaterConsumption, WireSpeed, LubrificationTimeTotal, EletricConsumption, Production }) => 
            
            <><div className="container-dashboard col-12">
                       <div className="row-dashboard"eventkey={this.state.key}>
                           <Card className="card-box-header" style={{ backgroundColor: "#E4181D", color: "#ffffff" }} onClick={() => this.handleSelectItem(1, 'none')}>
                               <h6></h6>
                               <h2 style={{ backgroundColor: "#E4181D", color: "#ffffff" }}>{id}</h2>
                               <h6></h6>
                           </Card>
                           <Card eventkey={1} onClick={() => this.handleSelectItem(1, 'pecas')} className={'card-box-header' + (this.currentItem === 'pecas' ? " active" : "")}>
                               <h6>Peças Produzidas</h6>
                               <h1 style={{ color: "#333" }}>{Production.value}</h1>
                               <h6>UNI</h6>
                           </Card>
                           <Card eventkey={2} onClick={() => this.handleSelectItem(2, 'corrente')} className={'card-box-header' + (this.currentItem === 'corrente' ? " active" : "")}>
                               <h6>Consumo Elétrico</h6>
                               <h1 style={{ color: "#333" }}>{EletricConsumption.value}</h1>
                               <h6>Amperes</h6>
                           </Card>
                           <Card eventkey={3} onClick={() => this.handleSelectItem(3, 'horas')} className={'card-box-header' + (this.currentItem === 'horas' ? " active" : "")}>
                               <h6>Funcionamento</h6>
                               <h1 style={{ color: "#333" }}>{Hours.value}</h1>
                               <h6>Horas</h6>
                           </Card>
                           <Card eventkey={4} onClick={() => this.handleSelectItem(4, 'agua')} className={'card-box-header' + (this.currentItem === 'agua' ? " active" : "")}>
                               <h6>Consumo Água</h6>
                               <h1 style={{ color: "#333" }}>{WaterConsumption.value}</h1>
                               <h6>Litros</h6>
                           </Card>
                           <Card eventkey={5} onClick={() => this.handleSelectItem(5, 'velocidade')} className={'card-box-header' + (this.currentItem === 'velocidade' ? " active" : "")}>
                               <h6>Velocidade FIO</h6>
                               <h1 style={{ color: "#333" }}>{WireSpeed.value}</h1>
                               <h6>RPM</h6>
                           </Card>
                           <Card eventkey={6} onClick={() => this.handleSelectItem(6, 'lubri')} className={'card-box-header' + (this.currentItem === 'lubri' ? " active" : "")}>
                               <h6>Lubrificação</h6>
                               <h1 style={{ color: "#333" }}>{LubrificationTimeTotal.value}</h1>
                               <h6>Horas</h6>
                           </Card>


                       </div>
                   </div>
                   <div className="container col-12">
                           

                               <MyChart maquina = {maquinaValues} />

                           
                       </div></>
                    
                               

                           
                           )} 
                           </>
         
        );
        
    }
}

export default Dashboard;