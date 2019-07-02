import React from 'react';
import './css/Footer.css';
// this component will be rendered by our <___Router>
const Footer = () => (
  <footer id="mainFooter">
    <div className="sharing">
      <ul>
        <li><a href={"whatsapp://send?text=Check out that playlist!" + window.location.href} data-action="share/whatsapp/share"><img src={require('./imgs/social_media/whatsapp.png')} /></a></li>
        <li><a href={"https://www.facebook.com/sharer.php?u=" + window.location.href} target="_blank"><img src={require('./imgs/social_media/facebook.png')} /></a></li>
        <li><a href="#" target="_blank"><img src={require('./imgs/social_media/instagram.png')} /></a></li>

      </ul>


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
