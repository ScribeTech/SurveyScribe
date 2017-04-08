import { Types } from 'mongoose';

// update state
export function updateState(surveys, questions, options) {
  return {
    type: 'UPDATE_STATE',
    surveys,
    questions,
    options
  };
}
// add survey
export function addSurvey(id, title) {
  return {
    type: 'ADD_SURVEY',
    id,
    title
  };
}

// edit survey
export function editSurvey(i, title) {
  return {
    type: 'EDIT_SURVEY',
    i,
    title
  };
}

// remove survey
export function removeSurvey(i) {
  return {
    type: 'REMOVE_SURVEY',
    i
  };
}

// add question
export function addQuestion(surveyId, label) {
  return {
    type: 'ADD_QUESTION',
    surveyId,
    id: Types.ObjectId(),
    label
  };
}
// edit question
export function editQuestion(surveyId, i, label) {
  return {
    type: 'EDIT_QUESTION',
    surveyId,
    i,
    label
  };
}
// remove question
export function removeQuestion(surveyId, i) {
  return {
    type: 'REMOVE_QUESTION',
    surveyId,
    i
  };
}

// add Option
export function addOption(questionId, label) {
  return {
    type: 'ADD_OPTION',
    questionId,
    label
  };
}

// remove option
export function editOption(questionId, i, label) {
  return {
    type: 'EDIT_OPTION',
    questionId,
    i,
    label
  };
}

// remove option
export function removeOption(questionId, i) {
  return {
    type: 'REMOVE_OPTION',
    questionId,
    i
  };
}

// increment votes
export function increment(questionId, i) {
  return {
    type: 'INCREMENT_VOTES',
    questionId,
    i
  };
}
