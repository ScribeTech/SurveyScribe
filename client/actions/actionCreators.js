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

export function addSurvey(id, title) {
  return {
    type: 'ADD_SURVEY',
    id,
    title
  };
}

// edit survey
export function editSurvey(id, title) {
  return {
    type: 'EDIT_SURVEY',
    id,
    title
  };
}

// remove survey
export function removeSurvey(id) {
  return {
    type: 'REMOVE_SURVEY',
    id
  };
}

// edit question (data is Object holding question kind specific data
// SELECT data = { required, maxSelection }
// SCALE  data = { required, min, max }
// TEXT data = { required, max }
export function addQuestion(kind) {
  return {
    type: 'ADD_QUESTION',
    id: ObjectId(),
    kind
  };
}
// edit question (data is Object holding question kind specific data
// SELECT data = { required, maxSelection }
// SCALE  data = { required, min, max }
// TEXT data = { required, max }
export function editQuestion(id, kind, data) {
  return {
    type: 'EDIT_QUESTION',
    id,
    kind,
    data
  };
}

// remove question (kind is only necessary for SELECT questions)
export function removeQuestion(id, kind) {
  return {
    type: 'REMOVE_QUESTION',
    id,
    kind
  };
}

// add a SELECT option
export function addOption(questionId, kind, label) {
  return {
    type: 'ADD_OPTION',
    questionId,
    kind,
    id: ObjectId(),
    label
  };
}

// edit SELECT option
export function editOption(questionId, kind, id, label) {
  return {
    type: 'EDIT_OPTION',
    questionId,
    kind,
    id,
    label
  };
}

// remove SELECT option
export function removeOption(questionId, id, kind) {
  return {
    type: 'REMOVE_OPTION',
    questionId,
    id,
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
export function removeAnswer(questionId, kind, i) {
  return {
    type: 'REMOVE_ANSWER',
    questionId,
    kind,
    i
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
