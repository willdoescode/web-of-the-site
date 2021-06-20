import React from 'react';
import './Home.css'

const Home = () => {
  return <div className="home">
    <div className="text">
      <h1>Hey, I'm Will!</h1>
      <h1>You discovered my world wide web site.</h1>
      <h1>Check out my <a href="https://github.com/willdoescode" rel="noreferrer" target="_blank">github</a>.</h1>
    </div>

    <div className="content">
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FGiXbMe92rt9NS%2Fgiphy.gif&f=1&nofb=1" alt="globe" />
      <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fblog.tice.de%2Fa_pics%2FInternet_Explorer.gif&f=1&nofb=1" alt="globe" />
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F000%2F328%2F752%2Ffdc.gif&f=1&nofb=1" alt="globe" />
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FRBkOH90SURUas%2F200.gif&f=1&nofb=1" alt="globe" />
    </div>
  </div>
}

export default Home;
