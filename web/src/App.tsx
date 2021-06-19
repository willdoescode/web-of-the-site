import React from 'react';
import './App.css';
import About from './About';
import Home from './Home';
import FourOFour from './404';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="*">
          <FourOFour />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
