import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { List, ListItem } from 'material-ui/List';

import Layout from './Layout';

const actions = [
  { label: 'Save', callback: () => {} },
  { label: 'Share', callback: () => {} },
  { label: 'Delete', callback: () => {} }
];

const Edit = (props) => {
  const surveyID = props.params.surveyID;
  const [survey] = props.surveys.filter(s => s.id === surveyID);
    // TODO: keep track of this in a reducer
  return (
    <Layout title="Survey Edit" actions={actions}>
      <TextField
        floatingLabelText="Title"
        id={survey.id.toString()}
        defaultValue={survey.title}
      />
      {props.questions[survey.id].map((question, i) => (
        <List>
          {`${i + 1}.   `}
          <TextField
            id={survey.id.toString()}
            floatingLabelText="Question"
            defaultValue={question.label}
          />
          <IconButton onClick={() => props.removeQuestion(survey.id, i)}>
            <CloseIcon />
          </IconButton>
          {props.options[question.questionId].map((option, j) => (
            <ListItem disabled>
              <TextField
                id={survey.id.toString()}
                floatingLabelText="Option"
                defaultValue={option.label}
              />
              <IconButton onClick={() => props.removeOption(question.questionId, j)}>
                <CloseIcon />
              </IconButton>
            </ListItem>
          ))}
          <RaisedButton label="Add Option" onClick={() => props.addOption(question.questionId)} />
        </List>
      ))}
      <FloatingActionButton
        onClick={() => props.addQuestion(survey.id, '')}
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
