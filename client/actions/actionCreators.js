import { generate as ObjectId } from 'shortid';

export function updateSurveys(surveys) {
  return {
    type: 'UPDATE_SURVEYS',
    surveys
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

// add question (data is Object holding kind-specific data)
export function addQuestion(kind) {
  return {
    type: 'ADD_QUESTION',
    id: ObjectId(),
    kind
  };
}
// edit question (data is Object holding kind-specific data)
export function editQuestion(id, title, kind, required, data) {
  return {
    type: 'EDIT_QUESTION',
    id,
    title,
    kind,
    required,
    data
  };
}

// remove question
export function removeQuestion(id) {
  return {
    type: 'REMOVE_QUESTION',
    id
  };
}

// add SELECT option
export function addOption(questionId, kind, label) {
  return {
    type: 'ADD_OPTION',
    kind,
    questionId,
    label
  };
}

// edit SELECT option
export function editOption(questionId, i, label) {
  return {
    type: 'EDIT_OPTION',
    questionId,
    i,
    label
  };
}

// remove SELECT option
export function removeOption(questionId, i) {
  return {
    type: 'REMOVE_OPTION',
    questionId,
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
