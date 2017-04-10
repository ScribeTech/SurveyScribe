import React from 'react';

import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Logo from '../assets/Logo.svg';
import Github from '../assets/GitHub-Mark.svg';
import { getSurveys } from '../utilities/getSurveys';

const LandingPage = props => (
  <div>
    <img src={Logo} alt="logo" width="163px" height="109px" />
    <img src={Github} alt="Github" width="32px" height="32px" />
    <RaisedButton label="Create Survey" style={{ margin: 12 }} onClick={() => getSurveys(props, 'survey')} />
    <ul>
      <li><Link to="/survey"> survey test link</Link></li>
      <li><Link to="/survey/1/edit"> edit test link</Link></li>
      <li><Link to="/survey/1/results"> results test link</Link></li>
      <li><Link to="/survey/1/answer"> answer test link</Link></li>
      <li><Link to="/survey/1/finish"> finish test link</Link></li>
    </ul>
    <p className="footer">Created by Nathan Clark Baumgartner, Megan Rabuse, Elijah Schow, Jin Chung</p>
  </div>
);

export default LandingPage;
