import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './header.scss';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      collapse: false,
      collapseID: '',
    };
  }

  toggleMenu = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    return (
      <header id='main-header'>
        <div id='logo'>
          <Link to='/'>
            <MediaQuery minWidth={768}>
              <img src='/imgs/logo/logo.png' alt='logo' />
            </MediaQuery>
            <MediaQuery maxWidth={767}>
              <img src='/imgs/logo/logo-mobile.png' alt='logo' />
            </MediaQuery>
          </Link>

        </div>
        <MediaQuery maxWidth={767}>
          <div className='hamburger' data-collapse={this.state.collapse} onClick={this.toggleMenu}>
            <div className='bar1'></div>
            <div className='bar2'></div>
            <div className='bar3'></div>
          </div>
        </MediaQuery>
        <ul data-display={this.state.collapse}>
          <li className={classNames({'active': window.location.pathname === '/' })}><Link to='/'>HOME</Link></li>
          <li className={classNames({'active': window.location.pathname === '/start'})}><Link to='/start'>START</Link></li>
          <li className={classNames({'active': window.location.pathname === '/about'})}><Link to='/about'>ABOUT</Link></li>
        </ul>
      </header>
    );
  }
}

export default Header;
