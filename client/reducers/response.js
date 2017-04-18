import { remove } from './util';

function select(state = {}, action) {
  switch (action.type) {
    case 'ADD_ANSWER':
      console.log(state.value);
      return {
        question: action.questionId,
        value: [
          ...state.value,
          action.value
        ]
      };
    case 'REMOVE_ANSWER':
      return Object.assign({}, state, {
        value: [
          ...state.value.slice(0, action.i),
          ...state.value.slice(action.i + 1)
        ]
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
