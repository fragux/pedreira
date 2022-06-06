import React, { Component } from "react";
//import { Media } from 'reactstrap';
/*import { Button, Form, FormGroup, Label, Input, FormText ,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';*/
import DropdownMaquina from "./DropDownMaquina";
//import ListaComponent from './ListaComponent';
import "./HeaderComponent.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maquinas: [],
    };

    this.handleCallback = (childData) => {
      this.setState({ name: childData });
      console.log("Pai: " + childData);
      props.bigParentCallback(childData);
      // this.bigParentCallback = childData;
    };
  }

  render() {
    const { name } = this.state;

    return (
      <div className="container-header">
        <div className="row-header">
          <h4>
            Dashboard
           
          </h4>
          <DropdownMaquina parentCallback={this.handleCallback} />
        </div>
        <h6 className="selectedmaquina">
          <i>{name}</i>
        </h6>
      </div>
    );
  }
}

export default Header;
