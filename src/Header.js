import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import logo from './imgs/logo.png';
import logoMobile from './imgs/logo-mobile.png';
import { Link } from 'react-router-dom';
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
          <Link to="/">
            <MediaQuery minWidth={768}>
              <img src={logo} alt="logo" />
            </MediaQuery>
            <MediaQuery maxWidth={767}>
              <img src={logoMobile} alt="logo" />
            </MediaQuery>
          </Link>

        </div>
        <MediaQuery maxWidth={767}>
          <div className="hamburger" data-collapse={this.state.collapse} onClick={this.toggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </MediaQuery>
        <ul data-display={this.state.collapse}>
          <li className={(window.location.pathname == "/") ? "active" : ""}><Link to="/">HOME</Link></li>
          <li className={(window.location.pathname == "/start") ? "active" : ""}><Link to="/start" >START</Link></li>
          <li className={(window.location.pathname == "/about") ? "active" : ""}><Link to="/about">ABOUT</Link></li>
        </ul>
      </header>
    );
  }
}

export { Header };
