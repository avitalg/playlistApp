import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.js';
import About from './About.js';
import Room from './Room.js';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/about' component={About}/>      
      <Route exact path='/room/:number' component={Room}/>
    </Switch>
  </main>
)

export default Main;
