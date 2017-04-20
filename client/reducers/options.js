import { remove } from './util';

function questionOptions(state = {}, action) {
  switch (action.type) {
    case 'ADD_OPTION':
      return {
        ...state,
        [action.optionId]: { id: action.optionId, label: action.label }
      };
    case 'REMOVE_OPTION':
      return remove(state, action.optionId);
    case 'EDIT_OPTION':
      return {
        ...state,
        [action.optionId]: Object.assign({}, state[action.optionId], { label: action.label })
      };
    case 'TOGGLE_SELECTED':
      return {
        ...state,
        [action.optionId]: Object.assign({}, state[action.optionId],
          { selected: !state[action.optionId].selected })
      };
    case 'TOGGLE_DISABLED':
      return {
        ...state,
        [action.optionId]: Object.assign({}, state[action.optionId],
          { disabled: !state[action.optionId].disabled })
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
        return remove(state, action.questionId);
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
