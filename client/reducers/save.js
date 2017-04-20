export function save(state = {}, action) {
  switch (action.type) {
    case 'SAVE_SURVEY':
      return Object.assign({}, state[action.i], { saved: true });
    case 'TOGGLE_SAVE':
      return Object.assign({}, state[action.i], { saved: false });
    default:
      return state;
  }
}

export default save;
