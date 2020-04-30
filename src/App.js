import React from 'react';
import Main from './Main.js';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './scss/App.scss';

// this component will be rendered by our <___Router>
const App = () => (
  <div className="app-wrapper">
    <Header />
    <Main />
    <Footer />
  </div>
)

export default App;
