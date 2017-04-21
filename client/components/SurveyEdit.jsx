import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
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
  results: (props) => { getResponses(props, `/survey/${props.params.surveyID}/results`); },
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
      <List>
        {_.map(props.options[question.id], (option) => {
          return (
            <ListItem
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
              rightIcon={
                <RemoveIcon
                  onClick={() => props.removeOption(question.id, option.id, question.kind)}
                />
              }
            />
          );
        })}
        <RaisedButton label="Add Option" onClick={() => props.addOption(question.id, question.kind, '')} />
      </List>
    );
  } else if (question.kind === 'Scale') {
    HTML = (
      <ListItem>
        <span>
          <TextField
            floatingLabelText="Min"
            hintText={props.questions[question.id].min.toString()}
            onChange={(e) => {
              props.editQuestion(question.id, 'Scale', { min: Number(e.target.value) });
            }}
          />
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          <TextField
            floatingLabelText="Max"
            hintText={props.questions[question.id].max.toString()}
            onChange={(e) => {
              props.editQuestion(question.id, 'Scale', { max: Number(e.target.value) });
            }}
          />
        </span>
      </ListItem>
    );
  } else if (question.kind === 'Text') {
    return (
      <ListItem>
        <TextField
          floatingLabelText="Max Characters"
          hintText={props.questions[question.id].max.toString()}
          onChange={(e) => {
            props.editQuestion(question.id, 'Text', { max: Number(e.target.value) });
          }}
        />
      </ListItem>
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
          <div key={question.id} className={'question'}>
            <h3>
              <InlineEdit
                className={'questiontitle'}
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
      </div>
      <Snackbar
        open={props.snackbar}
        message="Survey has been saved"
        autoHideDuration={4000}
        onRequestClose={() => props.hideSnackbar()}
      />
    </Light>
  );
};

Edit.propTypes = {}.isRequired;

export default Edit;
