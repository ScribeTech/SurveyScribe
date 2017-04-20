import { remove } from './util';

export function surveys(state = {}, action) {
  switch (action.type) {
    case 'ADD_SURVEY':
      return {
        ...state,
        [action.surveyId]: Object.assign({}, { id: action.surveyId, title: action.title })
      };
    case 'REMOVE_SURVEY':
      return remove(state, action.surveyId);
    case 'EDIT_SURVEY':
      return {
        ...state,
        [action.surveyId]: Object.assign({}, state[action.surveyId], { title: action.title })
      };
    case 'UPDATE_SURVEYS':
      return action.surveys;
    default:
      return state;
  }
}

export default surveys;
