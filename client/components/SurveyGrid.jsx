import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ClipboardButton from 'react-clipboard.js';
import _ from 'lodash';
import 'whatwg-fetch';

import Layout from './Layout';
import Clipboard from '../assets/Copy.svg';
import { getSurvey } from '../utilities/apiTalk';

const styles = {
  card: {
    marginBottom: 10,
    marginTop: 10
  },
  cardTitle: {
    marginLeft: 19
  }
};

const handleClick = (props) => {
  fetch('/api/surveys', {
    method: 'POST',
    credentials: 'same-origin',
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
      <Link to={`/survey/${props.id}/answer`} >
        <CardTitle style={styles.cardTitle} title={props.title} />
      </Link>
      <CardActions>
        <FlatButton label="Edit" onClick={() => getSurvey(props, `/survey/${props.id}/edit`, props.id)}/>
        <Link to={`/survey/${props.id}/results`}><FlatButton label="Results" /></Link>
        <IconMenu
          iconButtonElement={<FlatButton label="Share" />}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <div className="copy">
            <Card />
            Copy This Link
            <div className="link">
              <input id="url" className="url" type="text" value={`${window.location.href.split('/s')[0]}/survey/${props.id}/answer`} readOnly />
              <ClipboardButton className="copybtn" data-clipboard-target="#url">
                <img className="clipboard" alt="Copy to clipboard" src={Clipboard} />
              </ClipboardButton>
            </div>
            Use the button to copy the link
          </div>
        </IconMenu>
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
  index: React.PropTypes.string
};

SurveyTile.defaultProps = {
  index: 0
};

const SurveyGrid = props => (
  <Layout title="Surveys">
    <Grid>
      <Row>
        {_.map(props.surveys, (survey, i) =>
          <SurveyTile key={survey.id} {...survey} {...props} index={i} />)
        }
      </Row>
    </Grid>
    <FloatingActionButton
      style={styles.floatingactionbutton}
      className="floatingActionButton"
      onClick={() => handleClick(props)}
      zDepth={3}
    >
      <ContentAdd />
    </FloatingActionButton>
  </Layout>
);

SurveyGrid.propTypes = {
  surveys: React.PropTypes.objectOf(React.PropTypes.shape({
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
