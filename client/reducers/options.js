import { remove } from './util';

function questionOptions(state = {}, action) {
  switch (action.type) {
    case 'ADD_OPTION':
      return {
        ...state,
        [action.id]: Object.assign({}, state[action.id], { id: action.id, label: action.label })
      };
    case 'REMOVE_OPTION':
      return remove(state, action.id);
    case 'EDIT_OPTION':
      return {
        ...state,
        [action.id]: Object.assign({}, state[action.id], { label: action.label })
      };
    case 'TOGGLE_SELECTED':
      return {
        ...state,
        [action.id]: Object.assign({}, state[action.id], { selected: !state[action.id].selected })
      };
    default:
      return state;
  }
}

export function options(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_SURVEY':
      return action.options;
    case 'REMOVE_QUESTION':
      if (action.kind === 'Select') {
        return remove(state, action.id);
      }
      return state;
    default:
      switch (action.kind) {
        case 'Select':
          return {
            ...state,
            [action.questionId]: questionOptions(state[action.questionId], action)
          };
        default:
          return state;
      }
  }
}

export default options;
