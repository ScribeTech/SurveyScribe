export function warning(state = false, action) {
  switch (action.type) {
    case 'SHOW_WARNING':
      state = true;
      return state;
    case 'HIDE_WARNING':
      state = false;
      return state;
    default:
      return state;
  }
}

export default warning;
