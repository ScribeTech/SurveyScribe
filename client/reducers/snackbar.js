export function snackbar(state = false, action) {
  switch (action.type) {
    case 'SHOW_SNACK':
      return Object.assign({}, state[action.i], {
        show: true,
        message: action.message
      });
    case 'HIDE_SNACK':
      return Object.assign({}, state[action.i], {
        show: false,
      });

    case 'UPDATE_STATE':
      return action.signin;
    default:
      return state;
  }
}

export default snackbar;
