import React from 'react';
import './App.css';
import About from './About';
import Home from './Home';
import Posts from './Posts';
import Post from './Post';
import FourOFour from './404';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import computer from './images/oldcomputer.jpeg';
import { createClient } from '@urql/core';
import { Provider } from 'urql';

const client = createClient({
  url: "https://server-of-the-site.herokuapp.com/graphql",
});

const App = () => (
  <Provider value={client}>
    <Router>
      <div className="header">
        <img className="computer" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fold-computer-vector-illustration-vector-id586350282%3Fk%3D6%26m%3D586350282%26s%3D612x612%26w%3D0%26h%3DYk2tHku3_E-EOgNMVGIbbNywSmihhBRMwQDda9tNv-Q%3D&f=1&nofb=1" alt="computer" />

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

        <Route path="/posts">
          <Posts />
        </Route>

        <Route path="/post/:id">
          <Post />
        </Route>

        <Route path="*">
          <FourOFour />
        </Route>
      </Switch>
    </Router>
  </Provider>
)

export default App;
