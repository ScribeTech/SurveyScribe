import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

import Layout from './Layout';

const styles = {
  paper: {
    width: 'auto',
    hight: 'auto',
    margin: 10,
    padding: 15,
    'text-align': 'center',
  },
  h1: {
    'margin-top': '150px',
  },
  raisedbutton: {
    'margin-bottom': '150px'
  }
};

const Finish = props => (
  <Paper style={styles.paper}>
    <h1 style={styles.h1}> Yay you are finished! </h1>
    <Link to="survey/surveyId/results">
      <RaisedButton style={styles.raisedbutton}>
        Graph
      </RaisedButton>
    </Link>
  </Paper>
);

export default Finish;
