import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

import Logo from '../assets/Logo.svg';
import Github from '../assets/GitHub-Mark.svg';
import { getSurveys } from '../utilities/apiTalk';

const LandingPage = props => (
  <div className="landing-outer">
    <a
      href="https://github.com/ScribeTech/SurveyScribe"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className="github" src={Github} alt="Github" />
    </a>
    <div className="landing-inner">
      <div><img className="logo" src={Logo} alt="logo" /></div>
      <div>
        <RaisedButton label="Create Survey" style={{ margin: 12 }} onClick={() => getSurveys(props, '/survey')} />
      </div>
      <Link to="/signin">
        Sign up
      </Link>
      &nbsp;||&nbsp;
      <Link to="/login">
        Log In
      </Link>
    </div>
    <footer>Created by Nathan Clark Baumgartner, Megan Rabuse, Elijah Schow, and Jin Chung</footer>
  </div>
);

export default LandingPage;
