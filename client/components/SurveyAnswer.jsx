import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import Textfield from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';

import Content from './Content';
import { putSurvey } from '../utilities/apiTalk';

const Answer = (props) => {
  // Load the currently selected survey
  // TODO: move this code to middleware (see issue #94)
  const surveyID = props.params.surveyID;
  const [survey] = props.surveys.filter(s => s.id === surveyID);
  const toggleOptions = (questionId, optionId) => {
    if (!props.options[questionId][optionId].selected) {
      props.addAnswer(questionId, props.questions[questionId].kind, optionId);
    } else {
      props.removeAnswer(questionId, props.questions[questionId].kind, );
    }
    props.toggleSelected(questionId, optionId, props.questions[questionId].kind);
  };
  let i = 0;
  const kindRender = (questionId, kind) => {
    switch (kind) {
      case 'Select':
        return (
          <div>
            <h3>{`${props.questions[questionId].title}`}</h3>
            <List>
              {Object.keys(props.options[questionId]).forEach((optionId) => {
                <ListItem
                  leftCheckbox={<Checkbox onCheck={() => toggleOptions(questionId, optionId)} />}
                  primaryText={props.options[questionId][optionId].label}
                />;
              })}
            </List>
          </div>
        );
      case 'Scale':
        return (
          <div>
            <h3>{props.questions[questionId].title}</h3>
            <Slider
              min={props.questions[questionId].min}
              max={props.question[questionId].max}
              step={1}
              defaultValue={Math.floor(props.question[questionId].max/2)}
              value={props.response[questionId].value}
              onChange={this.handleSecondSlider}
            />
          </div>
        );
      case 'Text':
        return (
          <div>
            <h3>{props.questions[questionId].title}</h3>
            <Textfield
              maxlength={props.questions[questionId].max}
              required={props.questions[questionId].required}
            />
          </div>
        );
      default:
        break;
    }
  };
  // Render
  return (
    <Content className="content">
      <h1>{survey.title}</h1>
      {props.questions.map((questionId, i) => (
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
      <RaisedButton onClick={() => putSurvey(props, survey, `/survey/${props.params.surveyID}/finish`)} label="Submit Answers" primary fullWidth />
    </Content>
  );
};

Answer.propTypes = {}.isRequired;

export default Answer;
