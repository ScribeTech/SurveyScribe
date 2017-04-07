import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';

import Content from './Content';

const Answer = ({ surveys: [survey], questions, options }) => (
  <Content className="content">
    <h1>{survey.title}</h1>
    {questions[survey.id].map((question, i) => (
      <List>
        <h3>{`${i + 1}. ${question.label}`}</h3>
        {options[question.questionId].map(option => (
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText={option.label}
          />
        ))}
      </List>
    ))}
    <RaisedButton label="Submit Answers" primary fullWidth />
  </Content>
);

Answer.propTypes = {}.isRequired;

export default Answer;
