import React from 'react';
import './App.css';
import About from './About';
import Home from './Home';
import FourOFour from './404';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import computer from './images/oldcomputer.jpeg';

const App = () => {
  return <>

    <Router>
      <div className="header">
        <img className="computer" src={computer} alt="computer" />

        <div>
          <ul className="routes">
            <li><h1><Link to="/">Home</Link></h1></li>
            <li><h1><Link to="/about">About</Link></h1></li>
            <li><h1><Link to="/posts">Posts</Link></h1></li>
          </ul>
        </div>
      </div>

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
  </>
}

export default App;
