import React from 'react';
import Layout from './Layout';

const Results = (props) => {
  // Load the currently selected survey
  // TODO: move this code to middleware (see issue #94)
  const surveyID = props.params.surveyID;
  const [survey] = props.surveys.filter(s => s.id === surveyID);
  // Render
  return (
    <Layout title="Results">
      <h1>{survey.title}</h1>
    </Layout>
  );
};

Results.propTypes = {}.isRequired;

export default Results;
