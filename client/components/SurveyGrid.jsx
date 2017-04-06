import React from 'react';

import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Layout from './Layout';

const styles = {
  root: {
    paddingTop: 20
  },
  card: {
    marginBottom: 10,
    marginTop: 10
  }
};

const SurveyTile = props => (
  <Col xs={12} sm={6} md={4}>
    <Card style={styles.card}>
      <CardTitle title={props.title} />
      <CardActions>
        <Link to="/edit"><FlatButton label="Edit" /></Link>
        <Link to="/results"><FlatButton label="Results" /></Link>
        <Link to="/answer"><FlatButton label="Share" /></Link>
      </CardActions>
    </Card>
  </Col>
);

SurveyTile.propTypes = {
  title: React.PropTypes.string.isRequired
};

const actions = [
  { label: 'Save', callback: () => {} },
  { label: 'Share', callback: () => {} },
  { label: 'Delete', callback: () => {} }
];

const SurveyGrid = props => (
  <Layout title="Surveys" actions={actions} back="/">
    <Grid style={styles.root}>
      <Row>
        {props.surveys.map(survey => <SurveyTile key={survey.id} {...survey} />)}
      </Row>
    </Grid>
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
