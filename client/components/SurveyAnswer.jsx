import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import Textfield from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import _ from 'lodash';
import Content from './Content';
import { putSurvey } from '../utilities/apiTalk';

const Answer = (props) => {
  // Load the currently selected survey
  // TODO: move this code to middleware (see issue #94)
  const surveyID = props.params.surveyID;

  const disable = (questionId, selected, responses) => {
    const question = props.questions[questionId];
    const options = props.options[questionId];
    if (question.maxSelection !== 0 && question.maxSelection === selected) {
      Object.keys(options).forEach((oId) => {
        if (!responses[oId]) {
          props.toggleDisabled(question.id, oId, question.kind);
        }
      });
    }
  };

  const toggleOptions = (questionId, id) => {
    const options = props.options[questionId];
    const option = options[id];
    const question = props.questions[questionId];
    const response = props.response[questionId];

    props.toggleSelected(question.id, id, question.kind);
    if (!option.selected) {
      const responses = Object.assign({}, response,
        { value: Object.assign({}, response.value, { [id]: id }) });
      props.addAnswer(question.id, id, question.kind);
      disable(question.id, question.selected + 1, responses);
    } else {
      props.removeAnswer(question.id, id, question.kind);
    }
  };

  const renderOption = (questionId) => {
    renderOption.propTypes = {}.isRequired;
    const options = props.options[questionId];
    return (<div>
      {_.map(props.options[questionId], (option) => {
        return (<ListItem
          leftCheckbox={
            <Checkbox
              onCheck={() => {
                toggleOptions(questionId, option.id);
              }}
              disabled={options[option.id].disabled}
            />
                       }
          primaryText={options[option.id].label}
        />);
      })}
    </div>);
  };

  const renderKind = (question) => {
    const response = props.response[question.id];
    switch (question.kind) {
      case 'Select':
        props.updateResponse(question.id, question.kind);
        return (
          <div>
            <h3>{`${question.title}`}</h3>
            <List required={question.required}>
              {renderOption(question.id)}
            </List>
          </div>
        );
      case 'Scale':
        return (
          <div>
            <h3>{`${question.title}  ${response ? response.value
                 : question.min}`}</h3>
            <Slider
              min={question.min}
              max={question.max}
              step={1}
              required={question.required}
              defaultValue={Math.floor(question.max / 2)}
              value={response ? response.value
                     : question.min}
              onChange={(e, value) => {
                props.addAnswer(question.id, value, question.kind);
              }}
            />
          </div>
        );
      case 'Text':
        return (
          <div>
            <h3>{`${props.questions[question.id].title}`}</h3>
            <Textfield
              maxLength={props.questions[question.id].max}
              required={props.questions[question.id].required}
              rows={4}
              fullWidth
              multiLine
              onChange={(e, value) => {
                props.addAnswer(question.id, value, question.kind);
              }}
            />
          </div>
        );
      default:
        break;
    }
    renderKind.propTypes = {}.isRequired;
  };

  // Render
  return (
    <Content className="content">
      <h1>{props.surveys[surveyID].title}</h1>
      <div>
        {_.map(props.questions, question => (
          renderKind(question)
        ))}
      </div>
      <RaisedButton onClick={() => putSurvey(props, `/survey/${props.params.surveyID}/finish`)} label="Submit Answers" primary fullWidth />
    </Content>
  );
};

Answer.propTypes = {}.isRequired;

export default Answer;
