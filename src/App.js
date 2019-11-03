import React from 'react';
import './css/App.css';
import { Header } from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import Button from '@material-ui/core/Button';

// this component will be rendered by our <___Router>
const App = () => (
  <div className="app-wrapper">
    <Header />
    <Button variant="contained" color="primary">
      Hello World
    </Button>
    <Main />
    <Footer />
  </div>
)

export default App;
