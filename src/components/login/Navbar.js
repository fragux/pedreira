import React from 'react';
import LoginControl from "./LoginControl";
import "./NavBarStyle.css";
import logo from '../logo/or_logo.png'



class Navbar extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    //const {header_h2__bold, header_title, header_info, main_title, main_info} = this.props;
    return (
      
          <LoginControl />
      
    )
  }
} 

export default Navbar;