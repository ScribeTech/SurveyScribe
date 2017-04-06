export function options(state = {}, action) {
  switch (action.type) {
    case 'ADD_OPTIONS':
      return state;
    case 'REMOVE_OPTIONS':
      return state;
    case 'EDIT_OPTIONS':
      return state;
    case 'INCREMENT_VOTES':
      return state;
    default:
      return state;
  }
}

export default options;
