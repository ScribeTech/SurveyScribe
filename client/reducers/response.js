import { remove } from './util';

function select(state = {}, action) {
  switch (action.type) {
    case 'ADD_ANSWER':
      return {
        question: action.questionId,
        value: {
          ...state.value,
          [action.value]: action.value
        }
      };
    case 'REMOVE_ANSWER':
      return Object.assign({}, state, {
        value: remove(state.value, action.id)
      });
    default:
      return state;
  }
}

export function response(state = {}, action) {
  switch (action.kind) {
    case 'Select':
      return {
        ...state,
        [action.questionId]: select(state[action.questionId], action),
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
