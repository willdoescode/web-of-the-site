import React from 'react';
import './About.css'

const About = () => {
  const date = new Date();
  const age =
    date.getMonth() >= 9 && date.getDay() >= 23
      ? date.getFullYear() - 2006
      : date.getFullYear() - 2007;

  return <div className="about">
    <h1>I am Will</h1>
    <h1>A {age} year old developer from WA.</h1>
    <h2>Programming languages I enjoy:</h2>
    <ul>
      <li><h3>Rust</h3></li>
      <li><h3>Haskell</h3></li>
    </ul>
  </div>
}

export default About;
