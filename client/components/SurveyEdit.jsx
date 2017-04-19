import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import _ from 'lodash';
import 'whatwg-fetch';

import { Light } from './Theme';
import Header from './Header';
import { getSurveys, putSurvey } from '../utilities/apiTalk';

let sliderRef = '';

const actions = {
  save: (props) => { putSurvey(props, '/survey'); },
  share: (props) => { putSurvey(props, `/survey/${props.params.surveyID}/answer`); },
  results: (props) => { getSurveys(props, `/survey/${props.params.surveyID}/results`); },
  delete: (props) => {
    fetch(`/api/surveys/${props.params.surveyID}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    })
    .then(() => {
      getSurveys(props);
    });
  }
};

const renderMessage = (props, question) => {
  let HTML;
  if (question.kind === 'Select' || question.kind === undefined) {
    HTML = (
      _.map(props.options[question.id], option => (
        <div key={option.id} >
          <ListItem disabled>
            <TextField
              id={option.id.toString()}
              floatingLabelText="Option"
              defaultValue={option.label}
              onChange={(e) => {
                props.editOption(question.id, question.kind, option.id, e.target.value);
              }}
              multiLine
              fullWidth
            />
            <IconButton
              onClick={() => props.removeOption(question.id, option.id, question.kind)}
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
        </div>
      ))
    );
  } else if (question.kind === 'Scale') {
    HTML = (
      <div>
        <Slider
          step={1}
          defaultValue={0}
          max={props.questions[question.id].max}
          min={props.questions[question.id].min}
          ref={(slider) => { sliderRef = slider; }}
        />
        <span>
          <TextField
            floatingLabelText="Min"
            hintText={props.questions[question.id].min.toString()}
            onChange={(e) => {
              props.editQuestion(question.id, 'Scale', { min: Number(e.target.value) });
              sliderRef.state.value = e.target.value;
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
              sliderRef.state.value = props.questions[question.id].min;
            }}
          />
        </span>
      </div>
    );
  } else if (question.kind === 'Text') {
    return (
      <TextField
        floatingLabelText="Max Characters"
        hintText={props.questions[question.id].max.toString()}
        onChange={(e) => {
          props.editQuestion(question.id, 'Text', { max: Number(e.target.value) });
        }}
      />
    );
  }
  return HTML;
};

renderMessage.propTypes = {}.isRequired;

const renderAddOption = (props, question) => {
  let HTML;
  if (question.kind === 'Select') {
    HTML = <RaisedButton label="Add Option" onClick={() => props.addOption(question.id, question.kind, '')} />;
  }
  return HTML;
};

renderAddOption.propTypes = {}.isRequired;

const Edit = (props) => {
  const surveyID = props.params.surveyID;
  const [survey] = _.filter(props.surveys, s => s.id === surveyID);

  return (
    <Light>
      <div className="layout-semiwhole">
        <Header />
        <div className="layout-minor"><h1>Edit Survey</h1></div>
        <div className="actions layout-major">
          <RaisedButton primary label="Save" onClick={() => { putSurvey(props, '/survey'); }} />
          <FlatButton label="Share" onClick={() => { putSurvey(props, `/survey/${props.params.surveyID}/answer`); }} />
          <FlatButton label="Results" onClick={() => { getSurveys(props, `/survey/${props.params.surveyID}/results`); }} />
          <FlatButton
            label="Delete"
            onClick={
              () => {
                fetch(`/api/surveys/${props.params.surveyID}`, {
                  method: 'DELETE',
                  credentials: 'same-origin'
                })
                .then(() => {
                  getSurveys(props, '/survey');
                });
              }
            }
          />
        </div>
        <TextField
          floatingLabelText="Title"
          id={survey.id.toString()}
          defaultValue={survey.title}
          onChange={(e) => {
            props.editSurvey(survey.id, e.target.value);
          }}
        />
        {_.map(props.questions, question => (
          <List key={question.id}>
            <Toggle
              label="Required Question"
              onToggle={() => {
                props.editQuestion(
                  question.id, question.kind,
                  { required: !props.questions[question.id].required }
                );
              }}
            />
            <TextField
              id={survey.id.toString()}
              floatingLabelText="Question"
              defaultValue={question.title}
              onChange={(e) => {
                // editing question in state
                props.editQuestion(question.id, question.kind, { title: e.target.value });
              }}
              multiLine
            />
            <IconButton
              onClick={() => props.removeQuestion(question.id, question.kind)}
            >
              <CloseIcon />
            </IconButton>
            {renderMessage(props, question)}
            {renderAddOption(props, question)}
          </List>
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
    </Light>
  );
};

Edit.propTypes = {}.isRequired;

export default Edit;
