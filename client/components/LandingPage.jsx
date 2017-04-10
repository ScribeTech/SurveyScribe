import React from 'react';

import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Logo from '../assets/Logo.svg';
import Github from '../assets/GitHub-Mark.svg';
import { getSurveys } from '../utilities/getSurveys';

const LandingPage = props => (
  <div>
    <MuiThemeProvider>
      <RaisedButton
        href="https://github.com/ScribeTech/SurveyScribe"
        label="Github Link"
        icon={<img className="github" src={Github} alt="github" />}
      />
    </MuiThemeProvider>
    <Center >
      <img className="logo" src={Logo} alt="logo" />
    </Center>
    <MuiThemeProvider>
      <Center>
        <RaisedButton label="Create Survey" style={{ margin: 12 }} onClick={() => getSurveys(props, 'survey')} />
      </Center>
    </MuiThemeProvider>
    <footer >
      <p className="footer">Created by Nathan Clark Baumgartner, Megan Rabuse, Elijah Schow, and Jin Chung</p>
    </footer>
  </div>
);

export default LandingPage;
