import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Start from './pages/Start/Start';
import About from './pages/About/About';
import Room from './pages/Room/Room';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';

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
