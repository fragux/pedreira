import React, { Component } from "react";
import AppLogin from "./Containers/App";
import Machine from "./components/MachineComponent";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
  render() {
    return (
      <TransitionGroup>
        <CSSTransition classNames="page" timeout={500}>
          <AppLogin />
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default App;
