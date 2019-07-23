import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Start from './Start.js';
import About from './About.js';
import Room from './Room.js';
import Error from './404.js';
import Home from './Home.js';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/start' component={Start} />
      <Route exact path='/about' component={About} />
      <Route exact path='/room/:number' component={Room} />
      <Route exact path='/404' component={Error} />
      <Redirect to='/404' />
    </Switch>
  </main>
)

export default Main;
