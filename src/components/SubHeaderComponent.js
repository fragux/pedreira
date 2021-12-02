import React, { Component } from 'react';
/*import { Media } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText ,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import DropdownMaquina from './DropDownMaquina';
import ListaComponent from './ListaComponent';*/
import "./SubHeaderComponent.css"


class SubHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maquinas:[],
            key:1,
            isClicked: false,
            timeTotal: this.props.timeTotal,
            currentMode: 'dia'
                     
            
        };  
        //this.currentMode ='dia';
        this.getTimePeriod = this.getTimePeriod.bind(this); 
        this.timeTotal = this.props.timeTotal ;
        
    }

    getTimePeriod(current_mode){
        console.log('Estado actual: ', current_mode);
        this.handleSelect(1, this.currentMode)
        switch(current_mode){
            case 'dia': 
                return (<div>dia</div>);
            case 'semana': 
                return (<div>semana</div>);
            case 'mes': 
                return (<div>mes</div>);
            default: return;
            
        }
    }

    handleSelect(key, timePeriod){
        console.log('Periodo selecionado:', timePeriod);
        //this.getTimePeriod(timePeriod);
        this.currentMode=timePeriod;
        this.setState({isClicked:true});
        //props.parentCallback(this.state.timeTotal)
    }
    
    
    render() {
        return (
          <div className="container-subheader">
            <div className="row-header">
                <div className="buttons" eventkey={this.state.key}>
                  <button eventkey={1} onClick={()=>this.handleSelect(1, 'dia')} className={'dia' + ( this.currentMode === 'dia'? " active" : "")}>Dia</button>
                  <button  eventkey={2} onClick={()=>this.handleSelect(2, 'semana')} className={'semana' + ( this.currentMode === 'semana'? " active" : "")}>Semana</button>
                  <button eventkey={3} onClick={()=>this.handleSelect(3, 'mes')} className={'mes' + ( this.currentMode === 'mes'? " active" : "")}>Mês</button>

                </div>
                <div className="time">
                    Tempo Funcionamento: <h5 className="horas"> {this.props.timeTotal}</h5>
                </div>
            </div>
          </div>
        );
    }
}

export default SubHeader;