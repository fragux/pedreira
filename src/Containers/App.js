import React from "react";
import "./App.css";
import Navbar from "../components/login/Navbar";

class App extends React.Component {
  state = {
    // header
    header_h2__bold: "React",
    header_title: "Login System",
    header_info: "DASHBOARD - LOGIN",

    // main
    main_title: "LOGIN",
    main_info: "Insira o utilizador e a sua password",
  };

  render() {
    const state = this.state;
    return (
     
        <Navbar
          header_h2__bold={state.header_h2__bold}
          header_title={state.header_title}
          header_info={state.header_info}
          main_title={state.main_title}
          main_info={state.main_info}
        />
    
    );
  }
}

export default App;
