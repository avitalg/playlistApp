import React from 'react';
import './css/Footer.css';
// this component will be rendered by our <___Router>
const Footer = () => (
  <footer id="mainFooter">
    <div className="menu">
      <ul>
        <li>Home</li>
        <li>About</li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div className="rights">
      ©  {new Date().getFullYear()} Avital Glazer All rights reserved
      </div>
  </footer>
)

export default Footer;
