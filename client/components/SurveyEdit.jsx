import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';
import _ from 'lodash';
import 'whatwg-fetch';

import Layout from './Layout';
import { getSurveys, putSurvey } from '../utilities/apiTalk';

const actions = (props, survey) => [
  { label: 'Save',
    callback: () => {
      putSurvey(props, '/survey');
    }
  },
  { label: 'Share',
    callback: () => {
      putSurvey(props, `/survey/${props.params.surveyID}/answer`);
    }
  },
  {
    label: 'Results',
    callback: () => {
      getSurveys(props, `/survey/${props.params.surveyID}/results`);
    }
  },
  { label: 'Delete',
    callback: () => {
      fetch(`/api/surveys/${props.params.surveyID}`, {
        method: 'DELETE',
        credentials: 'same-origin'
      })
      .then(() => {
        getSurveys(props, '/survey');
      });
    } }
];

const styles = {
  option: {
    marginLeft: 15,
    width: 787
  },
  list: {
    width: 800
  },
  title: {
    width: 818
  },
  optionIconButton: {
    position: 'absolute',
    bottom: 20,
    left: 'right'
  },
  quesitonIconButton: {
    position: 'absolute',
    marginTop: 20
  },
  slider: {
    width: 800,
    marginLeft: 20
  }
};

const renderMessage = (props, question) => {
  const surveyID = props.params.surveyID;
  const [survey] = _.filter(props.surveys, s => s.id === surveyID);

  if (question.kind === 'Select' || question.kind === undefined) {
    return (
      _.map(props.options[question.id], (option, j) => (
        <div key={option.id} >
          <ListItem disabled>
            <TextField
              id={option.id.toString()}
              floatingLabelText="Option"
              defaultValue={option.label}
              onChange={(e) => {
                props.editOption(question.id, question.kind, option.id, e.target.value);
              }}
              style={styles.option}
              multiLine
            />
            <IconButton
              onClick={() => props.removeOption(question.id, option.id, question.kind)}
              style={styles.optionIconButton}
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
        </div>
      ))
    );
  } else if (question.kind === 'Scale') {
    return (
      <div>
        <Slider
          step={1}
          defaultValue={0}
          max={10}
          min={0}
          style={styles.slider}
          onChange={(e, value) => props.editSlider(question.id, 0, value)}
        />
      </div>
    );
  }

  renderMessage.propTypes = {}.isRequired;
};

const renderAddOption = (props, question) => {
  if (question.kind === 'Select') {
    return <RaisedButton label="Add Option" onClick={() => props.addOption(question.id, question.kind, '')} />;
  }
  renderAddOption.propTypes = {}.isRequired;
};

const Edit = (props) => {
  // Load the currently selected survey
  // TODO: move this code to middleware (see issue #94)
  const surveyID = props.params.surveyID;
  const [survey] = _.filter(props.surveys, s => s.id === surveyID);
  // Render
  return (
    <Layout title="Survey Edit" actions={actions(props, survey)}>
      <TextField
        floatingLabelText="Title"
        id={survey.id.toString()}
        defaultValue={survey.title}
        onChange={(e) => {
          props.editSurvey(survey.id, e.target.value);
        }}
        style={styles.title}
      />
      {_.map(props.questions, (question, i) => (
        <List key={question.id}>
          <Toggle
            label="Required Question"
            onToggle={() => {
              props.editQuestion(question.id, question.kind, { required: !props.questions[question.id].required })
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
            style={styles.list}
            multiLine
          />
          <IconButton
            onClick={() => props.removeQuestion(question.id, question.kind)}
            style={styles.quesitonIconButton}
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
    </Layout>
  );
};

Edit.propTypes = {}.isRequired;

export default Edit;
