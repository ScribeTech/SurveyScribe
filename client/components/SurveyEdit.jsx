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

const actions = props => [
  { label: 'Save', callback: () => {} },
  { label: 'Share', callback: () => {} },
  { label: 'Delete',
    callback: () => {
      fetch(`http://localhost:8080/api/surveys/${props.params.surveyID}`, { method: 'DELETE' });
    } }
];

const Edit = (props) => {
  // Load the currently selected survey
  // TODO: move this code to middleware (see issue #94)
  const surveyID = props.params.surveyID;
  const [survey] = props.surveys.filter(s => s.id === surveyID);
  // Render
  return (
    <Layout title="Survey Edit" actions={actions(props)}>
      <TextField
        floatingLabelText="Title"
        id={survey.id.toString()}
        defaultValue={survey.title}
      />
      {props.questions[survey.id] && props.questions[survey.id].map((question, i) => (
        <List key={question.id}>
          {`${i + 1}.   `}
          <TextField
            id={survey.id.toString()}
            floatingLabelText="Question"
            defaultValue={question.label}
          />
          <IconButton onClick={() => props.removeQuestion(survey.id, i)}>
            <CloseIcon />
          </IconButton>
          {props.options[question.id] && props.options[question.id].map((option, j) => (
            <ListItem disabled>
              <TextField
                id={survey.id.toString()}
                floatingLabelText="Option"
                defaultValue={option.label}
              />
              <IconButton onClick={() => props.removeOption(question.id, j)}>
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
