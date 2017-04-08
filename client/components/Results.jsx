import React from 'react';
import Layout from './Layout';

const Results = props => (
  <Layout title="Results">
    <h1>{props.surveys[props.params.surveyID].title}</h1>
  </Layout>
);

Results.propTypes = {}.isRequired;

export default Results;
