import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

import Logo from '../assets/Logo.svg';
import Github from '../assets/GitHub-Mark.svg';
import { getSurveys } from '../utilities/getSurveys';

const LandingPage = props => (
  <div className="landing-outer">
    <Link to="https://github.com/ScribeTech/SurveyScribe">
      <img className="github" src={Github} alt="Github" />
    </Link>
    <div className="landing-inner">
      <div><img className="logo" src={Logo} alt="logo" /></div>
      <div>
        <RaisedButton label="Create Survey" style={{ margin: 12 }} onClick={() => getSurveys(props, 'survey')} />
      </div>
    </div>
    <footer>Created by Nathan Clark Baumgartner, Megan Rabuse, Elijah Schow, and Jin Chung</footer>
  </div>
);

export default LandingPage;
