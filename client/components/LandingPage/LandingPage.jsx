import React from 'react';
import Center from 'react-center';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logo from './../../styles/Logo.png';
import css from './../../styles/stylesheet.css';

const LandingPage = () => (
  <div>
    <MuiThemeProvider>
      <RaisedButton
        href="https://github.com/ScribeTech/SurveyScribe"
        target="_blank"
        label="Github Link"
        icon={<FontIcon className="muidocs-icon-custom-github" />}
      />
    </MuiThemeProvider>
    <Center >
      <img className="logo" src={Logo} alt="logo" />
    </Center>
    <MuiThemeProvider>
      <Center >
        <Link to="/survey">
          <RaisedButton label="Create Survey" style={{ margin: 12 }} />
        </Link>
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

    <footer >
      <p className="footer">Created by Nathan Clark Baumgartner, Megan Rabuse, Eligah Schow, Jin Chung</p>
    </footer>
  </div>

);

export default LandingPage;
