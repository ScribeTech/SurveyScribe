import { remove } from './util';

function select(state = {}, action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { id: action.id, kind: action.kind, required: false, title: '', maxSelection: 0 });
    case 'EDIT_QUESTION':
      return Object.assign({}, state,
        { required: action.data.required || state.required,
          title: action.data.title || state.title,
          maxSelection: action.data.maxSelection || state.maxSelection
        });
    default:
      return state;
  }
}

function scale(state = {}, action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { id: action.id, kind: action.kind, required: false, title: '', min: 0, max: 0 });
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
        { id: action.id, kind: action.kind, required: false, title: '', max: 100 });
    case 'EDIT_QUESTION':
      return Object.assign({}, state,
        { required: action.data.required || state.required,
          title: action.data.title || state.title,
          max: action.data.max || state.max
        });
    default:
      return state;
  }
}

export function questions(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_SURVEY':
      return action.questions;
    case 'REMOVE_QUESTION':
      return remove(state, action);
    default:
      switch (action.kind) {
        case 'Select':
          return {
            ...state,
            [action.id]: select(state[action.id], action)
          };
        case 'Scale':
          return {
            ...state,
            [action.id]: scale(state[action.id], action)
          };
        case 'Text':
          return {
            ...state,
            [action.id]: text(state[action.id], action)
          };
        default:
          return state;
      }
  }
}

export default questions;
