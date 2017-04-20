import { remove } from './util';

function questionOptions(state = {}, action) {
  switch (action.type) {
    case 'ADD_OPTION':
      return {
        ...state,
        [action.optionId]: Object.assign({}, state[action.objectId],
          { id: action.objectId, label: action.label })
      };
    case 'REMOVE_OPTION':
      return remove(state, action.objectId);
    case 'EDIT_OPTION':
      return {
        ...state,
        [action.objectId]: Object.assign({}, state[action.objectId], { label: action.label })
      };
    case 'TOGGLE_SELECTED':
      return {
        ...state,
        [action.objectId]: Object.assign({}, state[action.objectId],
          { selected: !state[action.objectId].selected })
      };
    case 'TOGGLE_DISABLED':
      return {
        ...state,
        [action.objectId]: Object.assign({}, state[action.objectId],
          { disabled: !state[action.objectId].disabled })
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
