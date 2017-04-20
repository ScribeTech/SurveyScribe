import { remove } from './util';

function select(state = {}, action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { questionId: action.questionId, kind: action.kind, required: false, title: '', maxSelection: 0, selected: 0 });
    case 'EDIT_QUESTION':
      return Object.assign({}, state,
        { required: action.data.required || state.required,
          title: action.data.title || state.title,
          maxSelection: action.data.maxSelection || state.maxSelection
        });
    case 'ADD_ANSWER':
      return Object.assign({}, state,
        { selected: state.selected + 1 });
    case 'REMOVE_ANSWER':
      return Object.assign({}, state,
        { selected: state.selected - 1 });
    default:
      return state;
  }
}

function scale(state = {}, action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { questionId: action.questionId, kind: action.kind, required: false, title: '', min: 0, max: 10 });
    case 'EDIT_QUESTION':
      return Object.assign({}, state,
        { required: action.data.required || state.required,
          title: action.data.title || state.title,
          min: action.data.min || state.min,
          max: action.data.max || state.max
        });
    default:
      return state;
  }
}

function text(state = {}, action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { questionId: action.questionId, kind: action.kind, required: false, title: '', max: 100 });
    case 'EDIT_QUESTION':
      return Object.assign({}, state,
        { required: action.data.required || state.required,
          title: action.data.title || state.title,
          max: action.data.max || state.max
        });
    case 'ADD_ANSWER':
      return {
        ...state,
        [action.questionId]: select(state[action.questionId], action)
      };
    case 'REMOVE_ANSWER':
      return {
        ...state,
        [action.questionId]: select(state[action.questionId], action)
      };
    default:
      return state;
  }
}

export function questions(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_SURVEY':
      return action.questions;
    case 'REMOVE_QUESTION':
      return remove(state, action.questionId);
    default:
      switch (action.kind) {
        case 'Select':
          return {
            ...state,
            [action.questionId]: select(state[action.questionId], action)
          };
        case 'Scale':
          return {
            ...state,
            [action.questionId]: scale(state[action.questionId], action)
          };
        case 'Text':
          return {
            ...state,
            [action.questionId]: text(state[action.questionId], action)
          };
        default:
          return state;
      }
  }
}

export default questions;
