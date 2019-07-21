import React, { Component } from 'react';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse, MDBContainer,
  MDBHamburgerToggler
} from 'mdbreact';
import MediaQuery from 'react-responsive';
import logo from './imgs/logo.png';
import logoMobile from './imgs/logo-mobile.png';
import './css/header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      collapse1: false,
      collapseID: ''
    };
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
              <MDBNavbarBrand href="/" className="white-text">
                <div id="logo">
                  <MediaQuery minWidth={768}>
                    <img src={logo} alt="logo" />
                  </MediaQuery>
                  <MediaQuery maxWidth={767}>
                    <img src={logoMobile} alt="logo" />
                  </MediaQuery>
                </div>
              </MDBNavbarBrand>
              <MDBHamburgerToggler color="#fff" id="hamburger1" onClick={() => this.toggleSingleCollapse('collapse1')} />
              <MDBCollapse isOpen={this.state.collapse1} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="/" onClick={() => this.toggleSingleCollapse('collapse1')}>Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/about" onClick={() => this.toggleSingleCollapse('collapse1')}>About</MDBNavLink>
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

export { Header };
