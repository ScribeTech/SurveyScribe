import React from 'react';
import { Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Center from 'react-center';
import RaisedButton from 'material-ui/RaisedButton';

import Logo from '../assets/Logo.png';
import Github from '../assets/GitHub-Mark-32px.png';
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

    <Link to="/survey"> survey test link </Link>
    <br />
    <Link to="/survey/1/edit"> edit test link </Link>
    <br />

    <Link to="/survey/1/results"> results test link </Link>
    <br />

    <Link to="/survey/1/answer"> answer test link </Link>
    <br />

    <Link to="/survey/1/finish"> finish test link </Link>

    <footer >
      <p className="footer">Created by Nathan Clark Baumgartner, Megan Rabuse, Elijah Schow, Jin Chung</p>
    </footer>
  </div>
);

export default LandingPage;
