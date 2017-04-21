import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Snackbar from 'material-ui/Snackbar';

import Footer from './Footer';
import Logo from '../assets/images/logo-dark.svg';
import { Dark, Light } from './Theme';

const LandingPage = props => (
  <div>
    <Dark>
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
      <Snackbar
        open={props.signin.error || false}
        message={props.signin.message || ''}
        autoHideDuration={1500}
        onRequestClose={props.errorFalse}
      />
    </Dark>
    <Light><Footer /></Light>
  </div>
);

LandingPage.propTypes = {}.isRequired;

export default LandingPage;
