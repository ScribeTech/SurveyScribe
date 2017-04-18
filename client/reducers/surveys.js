import { remove } from './util';

export function surveys(state = {}, action) {
  switch (action.type) {
    case 'ADD_SURVEY':
      return {
        ...state,
        [action.id]: Object.assign({}, { id: action.id, title: action.title })
      };
    case 'REMOVE_SURVEY':
      return remove(state, action.id);
    case 'EDIT_SURVEY':
      return {
        ...state,
        [action.id]: Object.assign({}, state[action.id], { title: action.title })
      };
    case 'UPDATE_SURVEYS':
      return action.surveys;
    default:
      return state;
  }
}

export default surveys;
