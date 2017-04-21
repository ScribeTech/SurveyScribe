import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import Snackbar from 'material-ui/Snackbar';

import _ from 'lodash';
import 'whatwg-fetch';

import { Light } from './Theme';
import Header from './Header';
import InlineEdit from './InlineEdit';
import { getSurveys, putSurvey, getResponses } from '../utilities/apiTalk';

const actions = {
  save: (props) => { putSurvey(props); },
  share: (props) => { putSurvey(props, `/survey/${props.params.surveyID}/answer`); },
  results: (props) => { getResponses(props, props.params.surveyID, `/survey/${props.params.surveyID}/results`); },
  delete: (props) => {
    fetch(`/api/surveys/${props.params.surveyID}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    })
    .then(() => {
      getSurveys(props, '/survey');
    });
  }
};

const renderMessage = (props, question) => {
  let HTML;
  if (question.kind === 'Select' || question.kind === undefined) {
    HTML = (
      <div className="question-body">
        <List>
          {_.map(props.options[question.id], option => (
            <ListItem
              disabled
              primaryText={
                <InlineEdit
                  defaultValue={option.label}
                  placeholder="Option"
                  id={option.id}
                  onChange={e =>
                    props.editOption(question.id, option.id, question.kind, e.target.value)
                  }
                />
              }
              rightIconButton={
                <IconButton
                  onClick={() => props.removeOption(question.id, option.id, question.kind)}
                >
                  <CloseIcon />
                </IconButton>
              }
            />
          ))}
        </List>
        <RaisedButton label="Add Option" onClick={() => props.addOption(question.id, question.kind, '')} />
        <div>
          <TextField
            floatingLabelText="Max Selection"
            hintText={props.questions[question.id].maxSelection.toString()}
            onChange={(e) => {
              props.editQuestion(question.id, 'Select', { maxSelection: Number(e.target.value), selected: 0 });
            }}
          />
        </div>
      </div>
    );
  } else if (question.kind === 'Scale') {
    HTML = (
      <div className="question-body">
        <span>
          <TextField
            floatingLabelText="Min"
            hintText={props.questions[question.id].min.toString()}
            onChange={(e) => {
              if (Number(e.target.value) > props.questions[question.id].max) {
                props.showSnackbar('Slider Min value can not be more than Max');
                props.editQuestion(question.id, 'Scale', { min: props.questions[question.id].min });
              } else {
                props.editQuestion(question.id, 'Scale', { min: Number(e.target.value) });
              }
            }}
          />
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          <TextField
            floatingLabelText="Max"
            hintText={props.questions[question.id].max.toString()}
            onChange={(e) => {
              if (Number(e.target.value) < props.questions[question.id].min) {
                props.showSnackbar('Slider Max value can not be less than Min');
                props.editQuestion(question.id, 'Scale', { max: props.questions[question.id].max });
              } else {
                props.editQuestion(question.id, 'Scale', { max: Number(e.target.value) });
              }
            }}
          />
        </span>
      </div>
    );
  } else if (question.kind === 'Text') {
    return (
      <div className="question-body">
        <TextField
          floatingLabelText="Max Characters"
          hintText={props.questions[question.id].max.toString()}
          onChange={(e) => {
            props.editQuestion(question.id, 'Text', { max: Number(e.target.value) });
          }}
        />
      </div>
    );
  }
  return HTML;
};

renderMessage.propTypes = {}.isRequired;

const Edit = (props) => {
  const surveyID = props.params.surveyID;
  const [survey] = _.filter(props.surveys, s => s.id === surveyID);

  return (
    <Light>
      <div className="layout-semiwhole">
        <Header />
        <h1>
          <InlineEdit
            defaultValue={survey.title}
            placeholder="Title"
            onChange={(e) => {
              props.editSurvey(survey.id, e.target.value);
            }}
          />
        </h1>
        <div className="actions">
          <RaisedButton primary label="Save" onClick={() => actions.save(props)} />
          <FlatButton label="Share" onClick={() => actions.share(props)} />
          <FlatButton label="Results" onClick={() => actions.results(props)} />
          <Link to={'/survey'}><FlatButton label="Delete" onClick={() => actions.delete(props)} /></Link>
        </div>
        {_.map(props.questions, question => (
          <div key={question.id} className="question">
            <h3>
              <InlineEdit
                style={{ width: '90%' }}
                defaultValue={question.title}
                placeholder="Question"
                onChange={(e) => {
                  props.editQuestion(question.id, question.kind, { title: e.target.value });
                }}
              />
              <CloseIcon
                className={'close'}
                onClick={() => props.removeQuestion(question.id, question.kind)}
              />
            </h3>
            <Toggle
              label="Required"
              onToggle={() => {
                props.editQuestion(question.id, question.kind,
                { required: !props.questions[question.id].required });
              }}
              toggled={question.required}
            />
            {renderMessage(props, question)}
          </div>
        ))}
        <IconMenu
          iconButtonElement={
            <FloatingActionButton
              className="floatingActionButton"
              zDepth={3}
            >
              <ContentAdd />
            </FloatingActionButton>
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <MenuItem primaryText="Multiple Choice" onClick={() => props.addQuestion('Select')} />
          <MenuItem primaryText="Slider" onClick={() => props.addQuestion('Scale')} />
          <MenuItem primaryText="Short Answer" onClick={() => props.addQuestion('Text')} />
        </IconMenu>
        <Snackbar
          open={props.snackbar.show || false}
          message={props.snackbar.message || 'Survey has been saved'}
          autoHideDuration={1500}
          onRequestClose={() => props.hideSnackbar()}
        />
      </div>
    </Light>
  );
};

Edit.propTypes = {}.isRequired;

export default Edit;
