import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';

import Content from './Content';
import { updateSurvey } from '../utilities/getSurveys';

const Answer = (props) => {
  // Load the currently selected survey
  // TODO: move this code to middleware (see issue #94)
  const surveyID = props.params.surveyID;
  const [survey] = props.surveys.filter(s => s.id === surveyID);
  const toggleVotes = (questionId, i) => {
    if (!props.options[questionId][i].selected) {
      props.increment(questionId, i);
    } else {
      props.decrement(questionId, i);
    }
    props.toggleSelected(questionId, i);
  };

  const handleSubmit = () => {
    updateSurvey(props, survey, `survey/${props.params.surveyID}/finish`);
    props.socket.emit('new vote', {
      survey: props.surveys,
      questions: props.questions,
      options: props.options
    });
  };

  // Render
  return (
    <Content className="content">
      <h1>{survey.title}</h1>
      {props.questions[survey.id].map((question, i) => (
        <List>
          <h3>{`${i + 1}. ${question.label}`}</h3>
          {props.options[question.id].map((option, j) => (
            <ListItem
              leftCheckbox={<Checkbox onCheck={() => toggleVotes(question.id, j)} />}
              primaryText={option.label}
            />
          ))}
        </List>
      ))}
      <RaisedButton onClick={() => handleSubmit()} label="Submit Answers" primary fullWidth />
    </Content>
  );
};

Answer.propTypes = {}.isRequired;

export default Answer;
