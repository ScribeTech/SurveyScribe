import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import Textfield from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import _ from 'lodash';
import { Light } from './Theme';
import { postResponse } from '../utilities/apiTalk';
import { normalizeSurvey } from '../utilities/normalize';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }
  // Load the currently selected survey
  // TODO: move this code to middleware (see issue #94)

  componentWillMount() {
    fetch(`/api/surveys/${window.location.href.split('/')[4]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((result) => {
      const converted = normalizeSurvey(result);
      this.props.updateSurvey(converted.questions, converted.options);
      this.setState({
        title: result.title
      });
    })
    .catch((error) => {
      throw error;
    });
  }

  render() {
    const disable = (questionId, selected, responses) => {
      const question = this.props.questions[questionId];
      const options = this.props.options[questionId];
      if (question.maxSelection !== 0 && question.maxSelection === selected) {
        Object.keys(options).forEach((oId) => {
          if (!responses.value[oId]) {
            this.props.toggleDisabled(question.id, oId, question.kind);
          }
        });
      }
    };

    const action = [
      <RaisedButton
        label="Okay"
        onTouchTap={() => this.props.hideWarning()}
      />
    ];

    const toggleOptions = (questionId, id) => {
      const options = this.props.options[questionId];
      const option = options[id];
      const question = this.props.questions[questionId];
      const response = this.props.response[questionId];

      this.props.toggleSelected(question.id, id, question.kind);
      if (!option.selected) {
        const responses = Object.assign({}, response,
          { value: Object.assign({}, response.value, { [id]: id }) });
        this.props.addAnswer(question.id, id, question.kind);
        disable(question.id, question.selected + 1, responses);
      } else {
        this.props.removeAnswer(question.id, id, question.kind);
        disable(question.id, question.selected, response);
      }
    };

    const renderOption = (questionId) => {
      renderOption.propTypes = {}.isRequired;
      const options = this.props.options[questionId];
      return (<div>
        {_.map(this.props.options[questionId], option =>
          <ListItem
            leftCheckbox={
              <Checkbox
                onCheck={() => {
                  toggleOptions(questionId, option.id);
                }}
                disabled={options[option.id].disabled}
              />
                         }
            primaryText={options[option.id].label}
          />
        )}
      </div>);
    };

    const renderKind = (question) => {
      const response = this.props.response[question.id];
      switch (question.kind) {
        case 'Select':
          return (
            <div className="question">
              <h3>{`${question.title}`}</h3>
              <List required={question.required}>
                {renderOption(question.id)}
              </List>
            </div>
          );
        case 'Scale':
          return (
            <div className="question">
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
                  this.props.addAnswer(question.id, value, question.kind);
                }}
              />
            </div>
          );
        case 'Text':
          return (
            <div className="question">
              <h3>{`${this.props.questions[question.id].title}`}</h3>
              <Textfield
                maxLength={this.props.questions[question.id].max}
                required={this.props.questions[question.id].required}
                rows={4}
                fullWidth
                multiLine
                onChange={(e, value) => {
                  this.props.addAnswer(question.id, value, question.kind);
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
      <Light>
        <div className="layout-semiwhole">
          <h1>{this.state.title}</h1>
          <div>
            {_.map(this.props.questions, question => (
              renderKind(question)
            ))}
          </div>
          <RaisedButton onClick={() => postResponse(this.props, `/survey/${this.props.params.surveyID}/finish`)} label="Submit Answers" primary fullWidth />
          <Dialog
            open={this.props.warning} actions={action}
            onRequestClose={() => this.props.hideWarning()}
          >
          There is a required question you did not answer!
          </Dialog>
        </div>
      </Light>
    );
  }
}

Answer.propTypes = {}.isRequired;

export default Answer;
