function questionOptions(state = [], action) {
  switch (action.type) {
    case 'ADD_OPTION':
      return [
        ...state,
        {
          label: action.label,
          votes: 0
        }
      ];
    case 'REMOVE_OPTION':
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1)
      ];
    case 'EDIT_OPTION':
      return [
        ...state.slice(0, action.i),
        Object.assign({}, state[action.i], { label: action.label }),
        ...state.slice(action.i + 1)
      ];
    case 'EDIT_SLIDER':
      return [
        ...state.slice(0, action.i),
        Object.assign({}, state[action.i], { value: action.value }),
        ...state.slice(action.i + 1)
      ];
    case 'INCREMENT_VOTES':
      return [
        ...state.slice(0, action.i),
        Object.assign({}, state[action.i], { votes: state[action.i].votes + 1 }),
        ...state.slice(action.i + 1)
      ];
    case 'DECREMENT_VOTES':
      return [
        ...state.slice(0, action.i),
        Object.assign({}, state[action.i], { votes: state[action.i].votes - 1 }),
        ...state.slice(action.i + 1)
      ];
    case 'TOGGLE_SELECT':
      return [
        ...state.slice(0, action.i),
        Object.assign({}, state[action.i], { selected: !state[action.i].selected }),
        ...state.slice(action.i + 1)
      ];
    default:
      return state;
  }
}

export function options(state = {}, action) {
  if (typeof action.questionId !== 'undefined') {
    return {
      ...state,
      [action.questionId]: questionOptions(state[action.questionId], action)
    };
  }
  switch (action.type) {
    case 'UPDATE_STATE':
      return action.options;
    default:
      return state;
  }
}

export default options;
