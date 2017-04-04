import React from 'react';
import Center from 'react-center';
import { Link } from 'react-router';
import Logo from './../../styles/Logo.png';

const LandingPage = () => (
  <div>
    <Center >
      <img style={{ 'margin-top': '100px' }} className="logo" src={Logo} alt="logo" />
    </Center>
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
