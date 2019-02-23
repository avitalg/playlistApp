import React, { Component } from 'react';
import logo from './imgs/logo.png';
 import './header.css';

// this component will be rendered by our <___Router>
const Header = () => (
  <div id="mainHeader">
    <div className="menu">
	    <ul>
	    	<li><a href="/">Home</a></li>
	    	<li><a href="/about">About</a></li>
	    	<li></li>
	    	<li></li>
	    </ul>
    </div>
    <div id="logo">
    	<img src={logo} alt="logo"/>
    </div>
  </div>
)

export default Header;
