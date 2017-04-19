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

  const toggleOptions = (questionId, id) => {
    // select option
    console.log(id);
    console.log(props.options[questionId]);
    if (!props.options[questionId][id].selected) {
      // add option to response
      props.addAnswer(questionId, props.questions[questionId].kind, id);
      // disable other options if maxSelection has been reached
      if (props.questions[questionId].maxSelection
          === Object.keys(props.response[questionId].value).length) {
        Object.keys(props.options[questionId]).forEach((oId) => {
          if (!props.response[questionId][oId]) {
            props.toggleDisabled(questionId, oId);
          }
        });
      }
    // unselect option
    } else {
      // reenable other options if reducering from maxSelection
      if (props.questions[questionId].maxSelection
          === Object.keys(props.response[questionId].value).length) {
        Object.keys(props.options[questionId]).forEach((oId) => {
          if (!props.response[questionId][oId]) {
            props.toggleDisabled(questionId, oId);
          }
        });
      }
      // remove option from response
      props.removeAnswer(questionId, props.questions[questionId].kind, optionId);
    }
    props.toggleSelected(questionId, optionId, props.questions[questionId].kind);
  };

  const renderOption = (questionId) => {
    renderOption.propTypes = {}.isRequired;
    return (<div>
      {_.map(props.options[questionId], (option) => {
        return (<ListItem
          leftCheckbox={<Checkbox onCheck={() => toggleOptions(questionId, option.id)} />}
          primaryText={option.label}
          disabled={option.disabled}
        />);
      })}
    </div>);
  };

  const renderKind = (questionId, kind) => {
    switch (kind) {
      case 'Select':
        return (
          <div>
            <h3>{`${props.questions[questionId].title}`}</h3>
            <List required={props.questions[questionId].required}>
              {renderOption(questionId)}
            </List>
          </div>
        );
      case 'Scale':
        return (
          <div>
            <h3>{`${props.questions[questionId].title}  ${props.response[questionId] ? props.response[questionId].value
                 : props.questions[questionId].min}`}</h3>
            <Slider
              min={props.questions[questionId].min}
              max={props.questions[questionId].max}
              step={1}
              required={props.questions[questionId].required}
              defaultValue={Math.floor(props.questions[questionId].max / 2)}
              value={props.response[questionId] ? props.response[questionId].value
                     : props.questions[questionId].min}
              onChange={(e, value) => {
                props.addAnswer(questionId, value, kind);
              }}
            />
          </div>
        );
      case 'Text':
        return (
          <div>
            <h3>{`${props.questions[questionId].title}`}</h3>
            <Textfield
              maxLength={props.questions[questionId].max}
              required={props.questions[questionId].required}
              rows={4}
              fullWidth
              multiLine
              onChange={(e, value) => {
                props.addAnswer(questionId, value, kind);
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
          renderKind(question.id, question.kind)
        ))}
      </div>
      <RaisedButton onClick={() => putSurvey(props, `/survey/${props.params.surveyID}/finish`)} label="Submit Answers" primary fullWidth />
    </Content>
  );
};

Answer.propTypes = {}.isRequired;

export default Answer;
