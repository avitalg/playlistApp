import React from 'react';
import './Footer.scss';
// this component will be rendered by our <___Router>
const Footer = () => (
  <footer id='mainFooter'>
    <div className='menu'>
      {/* <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li></li>
        <li></li>
      </ul> */}
    </div>
    <div className='rights'>
      ©  {new Date().getFullYear()} Avital Glazer All rights reserved
      </div>
  </footer>
)

export default Footer;
