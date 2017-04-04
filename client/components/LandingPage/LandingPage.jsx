import React from 'react';
import { Link } from 'react-router';
import logo from './../../styles/Logo.png';

const LandingPage = () => (
  <div>
    <img className="logo" src={logo} alt="logo" />
    <p>LandingPage</p>
    <Link to="/survey"> survey test link </Link>
    <br />
    <Link to="/edit"> edit test link </Link>
    <br />

    <Link to="/results"> results test link </Link>
    <br />

    <Link to="/answer"> answer test link </Link>
    <br />

    <Link to="/finish"> finish test link </Link>
  </div>

);

export default LandingPage;
