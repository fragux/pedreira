import React from "react";
import DashBoard from "./DashBoard";
import Signup from "./SignUp";
import 'font-awesome/css/font-awesome.min.css'
import Machine from "../MachineComponent";
import {Routes, Route, withRouter, BrowserRouter as Router} from 'react-router-dom';
import logo from '../logo/or_logo.png'




class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        //{ username: "Admin", password: "ORodrigues.2021" },
        { username: "Oliveira", password: "OR.2122" }
      ],
      welcomeConnect: false,
      trueUsername: "",
      isSign: false,
      isSignUp: false
    };
    this.new = this.props;
  }

  Control = () => {
 
    var newState = this.state.users.concat(this.new.newUser);
    if (this.new.newUser !== undefined) {
      this.setState({
        users: newState
      });
    }

    var username = document.getElementById("username");
    var password = document.getElementById("password");
    this.state.users.map(user => {
      if (
        user.username === username.value &&
        user.password === password.value
      ) {
        return (this.setState({
          welcomeConnect: true,
          trueUsername: user.username
        }));
        }
        else alert("Não tem credenciais de acesso!!!\nPor favor insira username e password.")
    });
  };

  SignUp = () => {
    this.setState({ isSign: true });
  };

  render() {
    
    return (
     <>      {this.state.welcomeConnect ? ( 
            <Router>
              <Machine/>
              </Router>
     ) : this.state.isSign ? (
          <Signup dataState={this.state} isClick={this.state.welcomeConnect} />
        ) : (
          <div className="main_box_login">

        

        <div className="main_box--main_login">
        <div className="main_box--main--title_login">
            <img src={logo} alt="logo" width="150px" />
           
          </div>
          <div className="main_box--main--login_login col-12">
            <div className="row-login">
              <i className="fa fa-user"/>
                <input            
                  type="text"
                  id="username"
                  className="form-control "
                  placeholder="Utilizador"
                  autoComplete="false"
                />
            <br/>
            </div>
            <div className="row-login password">
              <i className="fa fa-lock"/>
                <input           
                  type="password"
                  id="password"
                  className="
                  form-control"
                  placeholder= "Palavra-Passe"
                />
            </div>
            <div className="row-login">
            <button className="btn-login" onClick={this.Control}>
              LOGIN
            </button>
            </div>
             
            
          </div>
          </div>
          </div>
        )}
      </>
    );
  }
}

export default LoginControl;