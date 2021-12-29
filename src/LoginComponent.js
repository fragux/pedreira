import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './LoginComponent.css';
import { LoginModal } from './components/login/login'



function Login (){
    return (
      <div className="App">
        <Navbar className="btn-danger">
          <div className="container">
                <h5><strong>OLIVEIRA RODRIGUES - Machine Dashboard</strong></h5>
          </div>
        </Navbar>
        <LoginModal />
      </div>
    );
  }


export default Login;