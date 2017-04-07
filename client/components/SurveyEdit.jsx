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

const Edit = ({ surveys, surveys: [survey], questions, options }, addSurvey) => (
  <Layout title="Survey Edit" actions={actions}>
    <TextField
      floatingLabelText="Title"
      id={survey.id.toString()}
      defaultValue={survey.title}
    />
    {questions[survey.id].map((question, i) => (
      <List>
        {`${i + 1}.   `}
        <TextField
          id={survey.id.toString()}
          floatingLabelText="Question"
          defaultValue={question.label}
        />
        <IconButton><CloseIcon /></IconButton>
        {options[question.questionId].map(option => (
          <ListItem disabled>
            <TextField
              id={survey.id.toString()}
              floatingLabelText="Option"
              defaultValue={option.label}
            />
            <IconButton><CloseIcon /></IconButton>
          </ListItem>
        ))}
        <RaisedButton label="Add Option" />
      </List>
    ))}
    <FloatingActionButton
      onClick={() => addSurvey((surveys.length + 1).toString(), '')}
      className="floatingActionButton"
      zDepth={3}
    >
      <ContentAdd />
    </FloatingActionButton>
  </Layout>
);

Edit.propTypes = {}.isRequired;

export default Edit;
