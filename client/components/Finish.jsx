import React from 'react';

import { Light } from './Theme';

const styles = {
  root: {
    display: 'absolute',
    textAlign: 'center'
  }
};

const Finish = () => (
  <Light>
    <div style={styles.root}>
      <div className="layout-semiwhole">
        <h1>You made it!</h1>
        {/* <div>
          <Link to={`/survey/${props.params.surveyID}/results`}><RaisedButton label="Graph" /></Link>
        </div> */}
      </div>
      <p> It is safe to close the page.</p>
    </div>
  </Light>
);

export default Finish;
