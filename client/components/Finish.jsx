import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import Content from './Content';

const styles = {
  root: {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'text-align': 'center'
  }
};

const Finish = props => (
  <Content style={styles.root}>
    <div>
      <h1>You made it!</h1>
      <p>It is safe to close the page.</p>
      <div>
        <Link to="/survey/1/results"><RaisedButton label="Graph" /></Link>
      </div>
    </div>
  </Content>
);

export default Finish;
