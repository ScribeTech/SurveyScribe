// increment
export function increment(surveyId, qIndex, opIndex) {
  return {
    type: 'INCREMENT_VOTES',
    surveyId,
    qIndex,
    opIndex
  };
}

// add survey
export function addSurvey(surveyId, title, questions) {
  return {
    type: 'ADD_SURVEY',
    surveyId,
    title,
    questions
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

// add question
export function addQuestion(surveyId, label, options) {
  return {
    type: 'ADD_QUESTION',
    surveyId,
    label,
    options
  };
}
// edit question
export function editQuestion(surveyId, qIndex, label) {
  return {
    type: 'EDIT_QUESTION',
    surveyId,
    qIndex,
    label
  };
}
// remove question
export function removeQuestion(surveyId, qIndex) {
  return {
    type: 'REMOVE_QUESTION',
    surveyId,
    qIndex
  };
}

// add Option
export function addOption(surveyId, qIndex, label, votes) {
  return {
    type: 'ADD_OPTION',
    surveyId,
    qIndex,
    label,
    votes
  };
}

// remove option
export function editOption(surveyId, qIndex, opIndex, label) {
  return {
    type: 'EDIT_OPTION',
    surveyId,
    qIndex,
    opIndex,
    label
  };
}

// remove option
export function removeOption(surveyId, qIndex, opIndex) {
  return {
    type: 'REMOVE_OPTION',
    surveyId,
    qIndex,
    opIndex
  };
}
