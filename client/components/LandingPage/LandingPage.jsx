import React from 'react';
import { Link } from 'react-router';

const LandingPage = () => (
  <div>
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
