import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';
import _ from 'lodash';
import 'whatwg-fetch';

import { Light } from './Theme';
import { getSurveys, putSurvey } from '../utilities/apiTalk';

let sliderRef = '';

const actions = props => [
  { label: 'Save',
    callback: () => {
      putSurvey(props, '/survey');
    }
  },
  { label: 'Share',
    callback: () => {
      putSurvey(props, `/survey/${props.params.surveyID}/answer`);
    }
  },
  {
    label: 'Results',
    callback: () => {
      getSurveys(props, `/survey/${props.params.surveyID}/results`);
    }
  },
  { label: 'Delete',
    callback: () => {
      fetch(`/api/surveys/${props.params.surveyID}`, {
        method: 'DELETE',
        credentials: 'same-origin'
      })
      .then(() => {
        getSurveys(props);
      });
    } }
];

const styles = {
  option: {
    marginLeft: '.5rem',
    marginRight: 0,
    padding: 0
  },
  list: {
    // width: 800
  },
  title: {
    // width: 818
  },
  optionIconButton: {
    float: 'right',
    marginTop: '-3.5rem'
  },
  quesitonIconButton: {
    float: 'right',
    marginTop: '-3.5rem'
  },
  scaleMax: {
    position: 'relative',
    width: 100,
    marginTop: -200
  }
};

const renderMessage = (props, question) => {
  if (question.kind === 'Select' || question.kind === undefined) {
    return (
      _.map(props.options[question.id], option => (
        <div key={option.id} >
          <ListItem disabled>
            <TextField
              id={option.id.toString()}
              floatingLabelText="Option"
              defaultValue={option.label}
              onChange={(e) => {
                props.editOption(question.id, question.kind, option.id, e.target.value);
              }}
              style={styles.option}
              multiLine
              fullWidth
            />
            <IconButton
              onClick={() => props.removeOption(question.id, option.id, question.kind)}
              style={styles.optionIconButton}
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
        </div>
      ))
    );
  } else if (question.kind === 'Scale') {
    return (
      <div>
        <Slider
          step={1}
          defaultValue={0}
          max={props.questions[question.id].max}
          min={props.questions[question.id].min}
          style={styles.slider}
          ref={(slider) => { sliderRef = slider; }}
        />
        <span>
          <TextField
            floatingLabelText="Min"
            hintText={props.questions[question.id].min.toString()}
            onChange={(e) => {
              props.editQuestion(question.id, 'Scale', { min: Number(e.target.value) });
              sliderRef.state.value = e.target.value;
            }}
            style={styles.scaleMax}
          />
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          <TextField
            floatingLabelText="Max"
            hintText={props.questions[question.id].max.toString()}
            onChange={(e) => {
              props.editQuestion(question.id, 'Scale', { max: Number(e.target.value) });
              sliderRef.state.value = props.questions[question.id].min;
            }}
            style={styles.scaleMax}
          />
        </span>
      </div>
    );
  } else if (question.kind === 'Text') {
    return (
      <TextField
        floatingLabelText="Max Characters"
        hintText={props.questions[question.id].max.toString()}
        onChange={(e) => {
          props.editQuestion(question.id, 'Text', { max: Number(e.target.value) });
        }}
      />
    );
  }

  renderMessage.propTypes = {}.isRequired;
};

const renderAddOption = (props, question) => {
  if (question.kind === 'Select') {
    return <RaisedButton label="Add Option" onClick={() => props.addOption(question.id, question.kind, '')} />;
  }
  renderAddOption.propTypes = {}.isRequired;
};

const Edit = (props) => {
  const surveyID = props.params.surveyID;
  const [survey] = _.filter(props.surveys, s => s.id === surveyID);

  return (
    <Light>
      <div className="layout-semiwhole">
        <h1>Edit Survey</h1>
        <TextField
          floatingLabelText="Title"
          id={survey.id.toString()}
          defaultValue={survey.title}
          onChange={(e) => {
            props.editSurvey(survey.id, e.target.value);
          }}
          style={styles.title}
        />
        {_.map(props.questions, question => (
          <List key={question.id}>
            <Toggle
              label="Required Question"
              onToggle={() => {
                props.editQuestion(question.id, question.kind,
                  { required: !props.questions[question.id].required });
                }}
            />
            <TextField
              id={survey.id.toString()}
              floatingLabelText="Question"
              defaultValue={question.title}
              onChange={(e) => {
                // editing question in state
                props.editQuestion(question.id, question.kind, { title: e.target.value });
              }}
              style={styles.list}
              multiLine
            />
            <IconButton
              onClick={() => props.removeQuestion(question.id, question.kind)}
              style={styles.quesitonIconButton}
            >
              <CloseIcon />
            </IconButton>
            {renderMessage(props, question)}
            {renderAddOption(props, question)}
          </List>
        ))}
        <IconMenu
          iconButtonElement={
            <FloatingActionButton
              className="floatingActionButton"
              zDepth={3}
            >
              <ContentAdd />
            </FloatingActionButton>
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <MenuItem primaryText="Multiple Choice" onClick={() => props.addQuestion('Select')} />
          <MenuItem primaryText="Slider" onClick={() => props.addQuestion('Scale')} />
          <MenuItem primaryText="Short Answer" onClick={() => props.addQuestion('Text')} />
        </IconMenu>
      </div>
    </Light>
  );
};

Edit.propTypes = {}.isRequired;

export default Edit;
