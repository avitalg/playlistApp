import React, { Component } from 'react';
 import './css/Footer.css';
import facebook from './imgs/facebook_logo.svg';
// this component will be rendered by our <___Router>
const Footer = () => (
  <footer id="mainFooter">
    <div className="sharing">

    <a href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share"><img src="#"/></a>
    <a href="https://www.facebook.com/sharer.php?u=http://www.ynet.co.il/articles/0,7340,L-5458282,00.html" target="_blank"><img src={facebook}/></a>
    </div>
    <div className="menu">
	    <ul>
	    	<li>Home</li>
	    	<li>About</li>
	    	<li></li>
	    	<li></li>
	    </ul>
    </div>
  </footer>
)

export default Footer;
