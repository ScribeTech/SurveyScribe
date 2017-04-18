import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

import Logo from '../assets/images/logo-dark.svg';
import { getSurveys } from '../utilities/apiTalk';

const LandingPage = props => (
  <div>
    <div className="jumbotron">
      <div className="center">
        <div><img className="logo" src={Logo} alt="logo" /></div>
        <h1>Survey Scribe</h1>
        <h2>Ask questions. Get answers.</h2>
        <div><RaisedButton primary label="Create Survey" style={{ margin: 12 }} onClick={() => getSurveys(props, 'survey')} /></div>
        <Link to="/signin">Sign up</Link>
        <Link to="/login">Log In</Link>
      </div>
    </div>
    <footer>Created by Nathan Clark Baumgartner, Megan Rabuse, Elijah Schow, and Jin Chung</footer>
  </div>
);

export default LandingPage;
