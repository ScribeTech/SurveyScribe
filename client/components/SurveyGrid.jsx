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
    browserHistory.push(`survey/${result._id}/${props.surveys.length}/edit`);
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
        <Link to={`/survey/${props.id}/${props.index}/edit`}><FlatButton label="Edit" /></Link>
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
  ]).isRequired,
  index: React.PropTypes.number
};

SurveyTile.defaultProps = {
  index: 0
};

const SurveyGrid = props => (
  <Layout title="Surveys">
    <Grid>
      <Row>
        {props.surveys.map((survey, i) => <SurveyTile key={survey.id} {...survey} index={i} />)}
      </Row>
    </Grid>
    <FloatingActionButton className="floatingActionButton" onClick={() => handleClick(props)}>
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
