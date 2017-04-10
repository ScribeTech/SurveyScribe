import React from 'react';

import Center from 'react-center';
import { Link } from 'react-router';
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
        <RaisedButton label="Create Survey" style={{ margin: 12 }} onClick={() => getSurveys(props, 'survey')} />
      </div>
    </div>
    <footer>Created by Nathan Clark Baumgartner, Megan Rabuse, Elijah Schow, and Jin Chung</footer>
  </div>
);

export default LandingPage;
