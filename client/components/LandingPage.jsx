import React from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Center from 'react-center';
import RaisedButton from 'material-ui/RaisedButton';

import Logo from '../assets/Logo.png';
import Github from '../assets/GitHub-Mark-32px.png';

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
        <Link to="/survey">
          <RaisedButton label="Create Survey" style={{ margin: 12 }} />
        </Link>
      </Center>
    </MuiThemeProvider>

    <Link to="/survey"> survey test link </Link>
    <br />
    <Link to="/survey/:surveyId/edit"> edit test link </Link>
    <br />

    <Link to="/results"> results test link </Link>
    <br />

    <Link to="/answer"> answer test link </Link>
    <br />

    <Link to="/finish"> finish test link </Link>

    <footer >
      <p className="footer">Created by Nathan Clark Baumgartner, Megan Rabuse, Elijah Schow, Jin Chung</p>
    </footer>
  </div>
);

export default LandingPage;
