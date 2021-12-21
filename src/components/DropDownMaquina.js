import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import FontAwesome from 'react-fontawesome';
import './DropDownMaquina.css'
import Menu from './MenuComponent';




const DropdownMaquina = (props) => {
    
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    //const [value,setValue]=React.useState('');

   
    const toggle = () => setDropdownOpen(prevState => !prevState);
    
    const [option,setOption] = React.useState();


   function handleChange(event){
        setOption(event.target.value);
        console.log("Filho: "+ event.target.value);
        props.parentCallback(event.target.value);
    } 
  
      
    return (
        
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret        
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >            
         Máquina
        </DropdownToggle>
        <DropdownMenu name="option" className="dropdownlist" container="body"  >
           
          <DropdownItem className="dropdownitem" onClick={handleChange} value="MONOFIO NFC 2000">MONOFIO NFC 2000</DropdownItem>
          <DropdownItem className="dropdownitem" onClick={handleChange} value="LOUSADA 2000">LOUSADA 2000</DropdownItem>
          <DropdownItem className="dropdownitem" onClick={handleChange} value="MINORCA">MINORÇA</DropdownItem>
          <DropdownItem className="dropdownitem" onClick={handleChange} value="SERRA 3500">SERRA 3500</DropdownItem>
          <DropdownItem className="dropdownitem" onClick={handleChange} value="teste">Maquina para Teste SQL</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
  );
}

export default DropdownMaquina;