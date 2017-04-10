import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import 'whatwg-fetch';
import Layout from './Layout';

const styles = {
  card: {
    marginBottom: 10,
    marginTop: 10
  },
  floatingactionbutton: {
    marginRight: 25
  }
};

const handleClick = (props) => {
  fetch('/api/surveys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'New Survey',
      questions: []
    })
  })
  .then(response => response.json())
  .then((result) => {
    // Adding survey to state and changing the view to edit
    props.addSurvey(result._id, result.title);
    browserHistory.push(`survey/${result._id}/edit`);
  })
  .catch((error) => {
    throw error;
  });
};

const SurveyTile = props => (
  <Col xs={12} sm={6} md={4}>
    <Card style={styles.card}>
      <CardTitle title={props.title} />
      <CardActions>
        <Link to={`/survey/${props.id}/edit`}><FlatButton label="Edit" /></Link>
        <Link to={`/survey/${props.id}/results`}><FlatButton label="Results" /></Link>
        <Link to={`/survey/${props.id}/answer`}><FlatButton label="Share" /></Link>
      </CardActions>
    </Card>
  </Col>
);

SurveyTile.propTypes = {
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired
};

const SurveyGrid = props => (
  <Layout title="Surveys">
    <Grid>
      <Row>
        {props.surveys.map(survey => <SurveyTile key={survey.id} {...survey} />)}
      </Row>
    </Grid>
    <FloatingActionButton style={styles.floatingactionbutton} className="floatingActionButton" onClick={() => handleClick(props)}>
      <ContentAdd />
    </FloatingActionButton>
  </Layout>
);

SurveyGrid.propTypes = {
  surveys: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired,
    title: React.PropTypes.string.isRequired
  }))
};

SurveyGrid.defaultProps = {
  surveys: []
};

export default SurveyGrid;
