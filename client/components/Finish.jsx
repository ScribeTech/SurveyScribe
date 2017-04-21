import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { Light } from './Theme';

const styles = {
  root: {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'text-align': 'center'
  }
};

const Finish = () => (
  <Light>
    <div style={styles.root} className="layout-semiwhole">
      <h1>You made it!</h1>
      {/* <div>
        <Link to={`/survey/${props.params.surveyID}/results`}><RaisedButton label="Graph" /></Link>
      </div> */}
    </div>
    <p style={styles.root}>It is safe to close the page.</p>
  </Light>
);

export default Finish;
