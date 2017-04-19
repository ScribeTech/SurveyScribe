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

const Finish = props => (
  <Light>
    <div className="layout-semiwhole">
      <h1>You made it!</h1>
      <p>It is safe to close the page.</p>
      <div>
        <Link to={`/survey/${props.params.surveyID}/results`}><RaisedButton label="Graph" /></Link>
      </div>
    </div>
  </Light>
);

export default Finish;
