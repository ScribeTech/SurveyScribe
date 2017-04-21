export function snackbar(state = false, action) {
  switch (action.type) {
    case 'SHOW_SNACK':
      return true;
    case 'HIDE_SNACK':
      return false;
    default:
      return state;
  }
}

export default snackbar;
