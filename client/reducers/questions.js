function surveyQuestions(state = [], action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [
        ...state,
        {
          id: action.id,
          label: action.label
        }
      ];
    case 'REMOVE_QUESTION':
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1)
      ];
    case 'EDIT_QUESTION':
      return [
        ...state.slice(0, action.i),
        Object.assign({}, state[action.i], { label: action.label }),
        ...state.slice(action.i + 1)
      ];
    default:
      return state;
  }
}


export function questions(state = {}, action) {
  if (typeof action.surveyId !== 'undefined') {
    return {
      ...state,
      [action.surveyId]: surveyQuestions(state[action.surveyId], action)
    };
  }
  switch (action.type) {
    case 'UPDATE_STATE':
      return action.questions;
    default:
      return state;
  }
}

export default questions;
