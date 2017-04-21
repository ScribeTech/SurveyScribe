import React from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ClipboardButton from 'react-clipboard.js';
import _ from 'lodash';
import 'whatwg-fetch';

import Assessment from 'material-ui/svg-icons/action/assessment';
import Clipboard from 'material-ui/svg-icons/content/content-copy';

import { Light } from './Theme';
import { getSurvey, getResponses } from '../utilities/apiTalk';
import Header from './Header';

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
    getSurvey(props, `/survey/${result._id}/edit`, result._id);
    props.addSurvey(result._id, result.title);
  })
  .catch((error) => {
    throw error;
  });
};

const Share = props => (
  <IconMenu
    iconButtonElement={<FlatButton label="Share" />}
    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
  >
    <div className="copy">
      Copy This Link
      <div className="link">
        <input id="url" className="url" type="text" value={`${window.location}/${props.id}/answer`} readOnly />
        <ClipboardButton className="copybtn" data-clipboard-target="#url"><Clipboard className="clipboard" /></ClipboardButton>
      </div>
      Use the button to copy the link
    </div>
  </IconMenu>
);

Share.propTypes = {}.isRequired;

const SurveyItem = props => (
  <div className="list-item media">
    <Link onClick={() => getSurvey(props, props.id, `/survey/${props.id}/edit`)}>
      <div className="img"><Assessment color="#3498DB" /></div>
    </Link>
    <div className="media-body">
      <Link onClick={() => getSurvey(props, props.id, `/survey/${props.id}/edit`)}>
        <div className="list-item-body">
          <h2 className="primary">{props.title}</h2>
          <p className="secondary">Created MAR 5, 2017</p>
        </div>
      </Link>
      <div className="list-item-actions">
        <Link onClick={() => getResponses(props, props.id, `/survey/${props.id}/results`)}><FlatButton label="Results" /></Link>
        <Share {...props} />
      </div>
    </div>
  </div>
);

SurveyItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired
};

SurveyItem.defaultProps = {
  index: 0
};

const SurveyList = props => (
  <Light>
    <div className="layout-semiwhole">
      <Header {...props} />
      <h1>Surveys</h1>
      <div className="list">
        { Object.keys(props.surveys).length ?
          _.map(props.surveys, (survey, i) =>
            <SurveyItem key={survey.id} id={survey.id} {...survey} {...props} index={i} />)
        : <h3 className={'no-surveys'}>No surveys</h3> }
      </div>
      <FloatingActionButton
        className="floatingActionButton"
        onClick={() => handleClick(props)}
        zDepth={3}
      >
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </Light>
);

SurveyList.propTypes = {
  surveys: React.PropTypes.objectOf(React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired,
    title: React.PropTypes.string.isRequired
  }))
};

SurveyList.defaultProps = {
  surveys: {}
};

export default SurveyList;
