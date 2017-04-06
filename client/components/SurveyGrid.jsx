import React from 'react';

import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
  <Col xs={12} sm={12} md={4} xl={4}>
    <Card style={styles.card}>
      <CardTitle>{props.title}</CardTitle>
      <CardActions>
        <FlatButton label="Edit" />
        <FlatButton label="Results" />
        <FlatButton label="Share" />
      </CardActions>
    </Card>
  </Col>
);

const SurveyGrid = props => (
  <Grid style={styles.root}>
    <Row>
      {props.surveys.map(survey => <SurveyTile key={survey.id} {...survey} />)}
    </Row>
  </Grid>
);

export default SurveyGrid;
