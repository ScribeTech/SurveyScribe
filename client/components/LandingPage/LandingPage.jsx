import React from 'react';
import Center from 'react-center';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logo from './../../styles/Logo.png';

const LandingPage = () => (
  <div>
    <Center >
      <img style={{ marginTop: '200px' }} className="logo" src={Logo} alt="logo" />
    </Center>
    <MuiThemeProvider>
      <Center >
        <RaisedButton label="Create Survey" style={{ margin: 12 }} href="/survey" />
      </Center >
    </MuiThemeProvider>

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
