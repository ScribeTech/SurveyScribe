import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';

import Content from './Content';

const Answer = (props) => {
  const surveyID = props.params.surveyID;
  const [survey] = props.surveys.filter(s => s.id === surveyID);
    // TODO: keep track of this in a reducer
  return (
    <Content className="content">
      <h1>{survey.title}</h1>
      {props.questions[survey.id].map((question, i) => (
        <List>
          <h3>{`${i + 1}. ${question.label}`}</h3>
          {props.options[question.questionId].map(option => (
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
};

Answer.propTypes = {}.isRequired;

export default Answer;
