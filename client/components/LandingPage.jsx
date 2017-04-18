import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Logo from '../assets/images/logo-dark.svg';

import theme from '../utilities/theme';

const LandingPage = props => (
  <div>
    <MuiThemeProvider muiTheme={getMuiTheme(theme.dark)}>
      <div className="jumbotron">
        <div className="center">
          <div><img className="logo" src={Logo} alt="logo" /></div>
          <h1>Survey Scribe</h1>
          <h2>Ask questions. Get answers.</h2>
          <Link to="/signin"><RaisedButton primary label="Create Account" /></Link>
        </div>
        <div className="links">
          <Link to="/login"><FlatButton>Login</FlatButton></Link>
        </div>
      </div>
    </MuiThemeProvider>
    <MuiThemeProvider muiTheme={getMuiTheme(theme.light)}>
      <footer>
        Created by Nathan Clark Baumgartner, Megan Rabuse, Elijah Schow, and Jin Chung
      </footer>
    </MuiThemeProvider>
  </div>
);

export default LandingPage;
