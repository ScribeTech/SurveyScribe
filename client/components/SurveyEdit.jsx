import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { List, ListItem } from 'material-ui/List';
import 'whatwg-fetch';

import Layout from './Layout';
import { getSurveys, updateSurvey } from '../utilities/getSurveys';

const actions = (props, survey) => [
  { label: 'Save',
    callback: () => {
      updateSurvey(props, survey, '/survey');
    }
  },
  { label: 'Share',
    callback: () => {
      updateSurvey(props, survey, `/survey/${props.params.surveyID}/results`);
    }
  },
  { label: 'Delete',
    callback: () => {
      fetch(`/api/surveys/${props.params.surveyID}`, {
        method: 'DELETE'
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
  }
};

const Edit = (props) => {
  // Load the currently selected survey
  // TODO: move this code to middleware (see issue #94)
  const surveyID = props.params.surveyID;
  const [survey] = props.surveys.filter(s => s.id === surveyID);
  // Render
  return (
    <Layout title="Survey Edit" actions={actions(props, survey)}>
      <TextField
        floatingLabelText="Title"
        id={survey.id.toString()}
        defaultValue={survey.title}
        onChange={(e) => {
          props.editSurvey(props.params.index, e.target.value);
        }}
        style={styles.title}
      />
      {props.questions[survey.id] && props.questions[survey.id].map((question, i) => (
        <List key={question.id}>
          {`${i + 1}.   `}
          <TextField
            id={survey.id.toString()}
            floatingLabelText="Question"
            defaultValue={question.label}
            onChange={(e) => {
              // editing question in state
              props.editQuestion(surveyID, i, e.target.value);
            }}
            style={styles.list}
            multiLine
          />
          <IconButton
            onClick={() => props.removeQuestion(survey.id, i)}
            style={styles.quesitonIconButton}
          >
            <CloseIcon />
          </IconButton>
          {props.options[question.id] && props.options[question.id].map((option, j) => (
            <ListItem disabled>
              <TextField
                id={survey.id.toString()}
                floatingLabelText="Option"
                defaultValue={option.label}
                onChange={(e) => {
                  // editing option in state
                  props.editOption(question.id, j, e.target.value);
                }}
                style={styles.option}
                multiLine
              />
              <IconButton
                onClick={() => props.removeOption(question.id, j)}
                style={styles.optionIconButton}
              >
                <CloseIcon />
              </IconButton>
            </ListItem>
          ))}
          <RaisedButton label="Add Option" onClick={() => props.addOption(question.id)} />
        </List>
      ))}
      <FloatingActionButton
        onClick={() => props.addQuestion(survey.id)}
        className="floatingActionButton"
        zDepth={3}
      >
        <ContentAdd />
      </FloatingActionButton>
    </Layout>
  );
};

Edit.propTypes = {}.isRequired;

export default Edit;
