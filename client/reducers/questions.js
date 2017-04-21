import { remove } from './util';

function select(state = {}, action) {
  let output = null;
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { id: action.questionId, kind: action.kind, required: false, title: '', maxSelection: 0, selected: 0 });
    case 'EDIT_QUESTION':
      if (action.data.required !== undefined) {
        output = Object.assign({}, state,
          { required: action.data.required,
            title: action.data.title || state.title,
            maxSelection: action.data.maxSelection || state.maxSelection,
            selected: state.selected
          });
      } else {
        output = Object.assign({}, state,
          { required: state.required,
            title: action.data.title || state.title,
            maxSelection: action.data.maxSelection || state.maxSelection,
            selected: state.selected
          });
      }
      return output;
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
  let output = null;
  let actionDataMin = '';
  let actionDataMax = '';
  if (action.data) {
    actionDataMin = action.data.min;
  }
  if (action.data) {
    actionDataMax = action.data.max;
  }
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { id: action.questionId, kind: action.kind, required: false, title: '', min: 0, max: 10 });
    case 'EDIT_QUESTION':
      if (action.data.max === 0) {
        actionDataMax = action.data.max.toString();
      }
      if (action.data.min === 0) {
        actionDataMin = action.data.min.toString();
      }
      if (action.data.required !== undefined) {
        output = Object.assign({}, state,
          { required: action.data.required,
            title: action.data.title || state.title,
            min: actionDataMin || state.min,
            max: actionDataMax || state.max
          });
      } else {
        output = Object.assign({}, state,
          { required: state.required,
            title: action.data.title || state.title,
            min: actionDataMin || state.min,
            max: actionDataMax || state.max
          });
      }
      output.max = Number(output.max);
      output.min = Number(output.min);

      return output;
    default:
      return state;
  }
}

function text(state = {}, action) {
  let output = null;
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { id: action.questionId, kind: action.kind, required: false, title: '', max: 100 });
    case 'EDIT_QUESTION':
      if (action.data.required !== undefined) {
        output = Object.assign({}, state,
          { required: action.data.required,
            title: action.data.title || state.title,
            max: action.data.max || state.max
          });
      } else {
        output = Object.assign({}, state,
          { required: state.required,
            title: action.data.title || state.title,
            max: action.data.max || state.max
          });
      }
      return output;
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
