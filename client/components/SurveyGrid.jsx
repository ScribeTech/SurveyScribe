import React from 'react';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ClipboardButton from 'react-clipboard.js';
import _ from 'lodash';
import 'whatwg-fetch';
import Assessment from 'material-ui/svg-icons/action/assessment';

import { Light } from './Theme';
import Clipboard from '../assets/images/Copy.svg';
import { getSurvey, checkAuth } from '../utilities/apiTalk';

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
        <input id="url" className="url" type="text" value={`${window.location.href.split('/s')[0]}/survey/${props.id}/answer`} readOnly />
        <ClipboardButton className="copybtn" data-clipboard-target="#url">
          <img className="clipboard" alt="Copy to clipboard" src={Clipboard} />
        </ClipboardButton>
      </div>
      Use the button to copy the link
    </div>
  </IconMenu>
);

Share.propTypes.isRequired;

const SurveyItem = props => (
  <div className="list-item media">
    <div className="img"><Assessment color="#3498DB" /></div>
    <div className="media-body">
      <div className="list-item-body">
        <h2 className="primary"><Link to={`/survey/${props.id}/edit`}>{props.title}</Link></h2>
        <p className="secondary">Created MAR 5, 2017</p>
      </div>
      <div className="list-item-actions">
        <FlatButton label="Edit" onClick={() => getSurvey(props, `/survey/${props.id}/edit`, props.id)} />
        <Link to={`/survey/${props.id}/results`}><FlatButton label="Results" /></Link>
        <Share />
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
  <Light onLoad={() => checkAuth(props)}>
    <div className="layout-semiwhole">
      <h1>Surveys</h1>
      <div className="list">
        {_.map(props.surveys, (survey, i) =>
          <SurveyItem key={survey.id} {...survey} {...props} index={i} />)
        }
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
