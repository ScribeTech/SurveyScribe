export function warning(state = false, action) {
  switch (action.type) {
    case 'SHOW_WARNING':
      return true;
    case 'HIDE_WARNING':
      return false;
    default:
      return state;
  }
}

export default warning;
