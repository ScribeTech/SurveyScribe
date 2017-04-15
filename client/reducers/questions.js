function select(state = {}, action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { id: action.id, kind: action.kind, required: false, title: '', maxSelection: 0 });
    case 'REMOVE_QUESTION':
      return undefined;
    case 'EDIT_QUESTION':
      return Object.assign({}, state,
        { required: action.required, title: action.title, maxSelection: action.data.maxSelection });
    default:
      return state;
  }
}

function scale(state = {}, action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { id: action.id, kind: action.kind, required: false, title: '', min: 0, max: 0 });
    case 'REMOVE_QUESTION':
      return undefined;
    case 'EDIT_QUESTION':
      return Object.assign({}, state,
        { required: action.required,
          title: action.title,
          min: action.data.min,
          max: action.data.max });
    default:
      return state;
  }
}

function text(state = {}, action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state,
        { id: action.id, kind: action.kind, required: false, title: '', max: 100 });
    case 'REMOVE_QUESTION':
      return undefined;
    case 'EDIT_QUESTION':
      return Object.assign({}, state,
        { required: action.required, title: action.title, max: action.data.max });
    default:
      return state;
  }
}

export function questions(state = {}, action) {
  if (typeof action.id !== 'undefined') {
    switch (action.kind) {
      case 'Select':
        return {
          ...state,
          [action.id]: select(state, action)
        };
      case 'Scale':
        return {
          ...state,
          [action.id]: scale(state, action)
        };
      case 'Text':
        return {
          ...state,
          [action.id]: text(state, action)
        };
      default:
        return state;
    }
  }
  switch (action.type) {
    case 'UPDATE_SURVEY':
      return action.questions;
    default:
      return state;
  }
}

export default questions;
