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
      collapse: false,
      collapseID: ''
    };
  }

  toggleMenu = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    return (
      <header id='main-header'>
        <div id="logo">
          <MediaQuery minWidth={768}>
            <img src={logo} alt="logo" />
          </MediaQuery>
          <MediaQuery maxWidth={767}>
            <img src={logoMobile} alt="logo" />
          </MediaQuery>
        </div>
        <MediaQuery maxWidth={767}>
          <div className="hamburger" data-collapse={this.state.collapse} onClick={this.toggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </MediaQuery>
        <ul data-display={this.state.collapse}>
          <li className={(window.location.pathname == "/") ? "active" : ""}><a href="/">HOME</a></li>
          <li className={(window.location.pathname == "/start") ? "active" : ""}><a href="/start" >START</a></li>
          <li className={(window.location.pathname == "/about") ? "active" : ""}><a href="/about">ABOUT</a></li>
        </ul>
      </header>
    );
  }
}

export { Header };
