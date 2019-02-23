import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

// this component will be rendered by our <___Router>
const App = () => (
  <div className="app-wrapper">
    <Header />
    <Main />
    <Footer />
  </div>
)

export default App;
