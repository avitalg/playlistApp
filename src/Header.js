import React, { Component } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse, MDBContainer,
  MDBHamburgerToggler
} from 'mdbreact';
import logo from './imgs/logo.png';
import './css/header.css';
import socketIOClient from "socket.io-client";
var socket;

class Header extends Component {
  constructor() {
    super();

    socket = socketIOClient(process.env.REACT_APP_API_URL);
  }
  state = {
    collapse1: false,
    collapseID: ''
  }

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
  }

  toggleSingleCollapse = collapseId => {
    this.setState({
      ...this.state,
      [collapseId]: !this.state[collapseId]
    });
  }

  render() {
    return (
      <header id='main-header'>
        <MDBContainer>
          <MDBNavbar color="amber lighten-4" dark>
            <MDBContainer>
              <MDBNavbarBrand className="white-text">
                <div id="logo">
                  <img src={logo} alt="logo" />
                </div>
              </MDBNavbarBrand>
              <MDBHamburgerToggler color="#fff" id="hamburger1" onClick={() => this.toggleSingleCollapse('collapse1')} />
              <MDBCollapse isOpen={this.state.collapse1} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="/">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/about">About</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </MDBContainer>
      </header>
    );
  }
}

export { Header, socket };
