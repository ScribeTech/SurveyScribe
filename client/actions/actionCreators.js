import { generate as ObjectId } from 'shortid';

export function updateSurveys(surveys) {
  return {
    type: 'UPDATE_SURVEYS',
    surveys
  };
}

// update survey's questions and options
export function updateSurvey(questions, options) {
  return {
    type: 'UPDATE_SURVEY',
    questions,
    options
  };
}

// update responses
export function updateResponses(responses) {
  return {
    type: 'UPDATE_RESPONSES',
    responses
  };
}

// update aggregates
export function updateAggregates(aggregates) {
  return {
    type: 'UPDATE_AGGREGATES',
    aggregates
  };
}

export function addSurvey(surveyId, title) {
  return {
    type: 'ADD_SURVEY',
    surveyId,
    title
  };
}

// edit survey
export function editSurvey(surveyId, title) {
  return {
    type: 'EDIT_SURVEY',
    surveyId,
    title
  };
}

// remove survey
export function removeSurvey(surveyId) {
  return {
    type: 'REMOVE_SURVEY',
    surveyId
  };
}

export function addQuestion(kind) {
  return {
    type: 'ADD_QUESTION',
    questionId: ObjectId(),
    kind
  };
}
// edit question (data is Object holding question kind specific data
// Select data = { title, required, maxSelection }
// Scale  data = { title, required, min, max }
// Text data = { title, required, max }
export function editQuestion(questionId, kind, data) {
  return {
    type: 'EDIT_QUESTION',
    questionId,
    kind,
    data
  };
}

// remove question (kind is only necessary for SELECT questions)
export function removeQuestion(questionId, kind) {
  return {
    type: 'REMOVE_QUESTION',
    questionId,
    kind
  };
}

// add a SELECT option
export function addOption(questionId, kind, label) {
  return {
    type: 'ADD_OPTION',
    questionId,
    kind,
    optionId: ObjectId(),
    label
  };
}

// edit SELECT option
export function editOption(questionId, optionId, kind, label) {
  return {
    type: 'EDIT_OPTION',
    questionId,
    kind,
    optionId,
    label
  };
}

// remove SELECT option
export function removeOption(questionId, optionId, kind) {
  return {
    type: 'REMOVE_OPTION',
    questionId,
    optionId,
    kind
  };
}

// toggle selected for SELECTED options
export function toggleSelected(questionId, optionId, kind) {
  return {
    type: 'TOGGLE_SELECTED',
    questionId,
    optionId,
    kind
  };
}

// toggle disabled for SELECTED options
// response is array of chosen responses
export function toggleDisabled(questionId, optionId, kind) {
  return {
    type: 'TOGGLE_DISABLED',
    questionId,
    optionId,
    kind
  };
}

// add answer
export function addAnswer(questionId, value, kind) {
  return {
    type: 'ADD_ANSWER',
    questionId,
    value,
    kind
  };
}

// remove answer --- kind and i only for removing one Select option
// to remove an entire Select response, leave off kind and i
export function removeAnswer(questionId, optionId, kind) {
  return {
    type: 'REMOVE_ANSWER',
    questionId,
    optionId,
    kind,
  };
}
// toggle error
export function toggleError(i) {
  return {
    type: 'TOGGLE_ERROR',
    i
  };
}

export function errorFalse(i) {
  return {
    type: 'ERROR_FALSE',
    i
  };
}

export function errorTrue(message) {
  return {
    type: 'ERROR_TRUE',
    message
  };
}

export function editUser(id, name) {
  return {
    type: 'EDIT_USER',
    id,
    name
  };
}

export function showSnackbar(message) {
  return {
    type: 'SHOW_SNACK',
    message
  };
}

export function hideSnackbar() {
  return {
    type: 'HIDE_SNACK'
  };
}

export function showWarning() {
  return {
    type: 'SHOW_WARNING'
  };
}

export function hideWarning() {
  return {
    type: 'HIDE_WARNING'
  };
}
