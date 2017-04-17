import { remove } from './util';

function select(state = [], action) {
  switch (action.type) {
    case 'ADD_ANSWER':
      return [
        ...state,
        action.optionId
      ];
    case 'REMOVE_ANSWER':
      return [
        ...state(0, action.i),
        ...state(action.i + 1)
      ];
    default:
      return state;
  }
}

export function response(state = {}, action) {
  switch (action.kind) {
    case 'Select':
      return {
        ...state,
        [action.questionId]: select(state[action.questionId], action)
      };
    default:
      switch (action.type) {
        case 'ADD_ANSWER':
          return {
            ...state,
            [action.questionId]: Object.assign({}, state[action.questionId], {
              question: action.questionId,
              value: action.value
            })
          };
        case 'REMOVE_ANSWER':
          return remove(state, action.questionId);
        default:
          return state;
      }
  }
}


export default response;
