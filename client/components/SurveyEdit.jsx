import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkbox from 'material-ui/Checkbox';
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
import Snackbar from 'material-ui/Snackbar';

import _ from 'lodash';
import 'whatwg-fetch';

import { Light } from './Theme';
import Header from './Header';
import InlineEdit from './InlineEdit';
import { getSurveys, putSurvey } from '../utilities/apiTalk';

let sliderRef = '';

const actions = {
  save: (props) => { putSurvey(props); },
  share: (props) => { putSurvey(props, `/survey/${props.params.surveyID}/answer`); },
  results: (props) => { getSurveys(props, `/survey/${props.params.surveyID}/results`); },
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
      <div>
        <List>
          {_.map(props.options[question.id], option => (
            <ListItem
              key={option.id}
              leftCheckbox={<Checkbox />}
              primaryText={
                <InlineEdit
                  defaultValue={option.label}
                  placeholder="Option"
                  onChange={(e) => {
                    props.editOption(question.id, question.kind, option.id, e.target.value);
                  }}
                />
              }
              rightIcon={
                <CloseIcon
                  onClick={() => props.removeOption(question.id, option.id, question.kind)}
                />
              }
            />
          ))}
        </List>
        <RaisedButton label="Add Option" onClick={() => props.addOption(question.id, question.kind, '')} />
      </div>
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
          <div key={question.id}>
            <Toggle
              label="Required"
              onToggle={() => {
                props.editQuestion(
                  question.id, question.kind,
                  { required: !props.questions[question.id].required }
                );
              }}
            />
            <h3>
              <InlineEdit
                defaultValue={question.title}
                placeholder="Question"
                onChange={(e) => {
                  props.editQuestion(question.id, question.kind, { title: e.target.value });
                }}
              />
            </h3>
            <IconButton
              onClick={() => props.removeQuestion(question.id, question.kind)}
            >
              <CloseIcon />
            </IconButton>
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
        open={props.save.saved || false}
        message="Survey has been saved"
        autoHideDuration={4000}
        onRequestClose={() => props.toggleSave()}
      />
    </Light>
  );
};

Edit.propTypes = {}.isRequired;

export default Edit;
