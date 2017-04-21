export function save(state = false, action) {
  switch (action.type) {
    case 'SAVE_SURVEY':
      return true;
    case 'TOGGLE_SAVE':
      return false;
    default:
      return state;
  }
}

export default save;
