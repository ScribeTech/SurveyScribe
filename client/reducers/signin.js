export function signin(state = [], action) {
  switch (action.type) {
    case 'TOGGLE_ERROR':
      return Object.assign({}, state[action.i], { error: !state.error });

    case 'UPDATE_STATE':
      return action.signin;
    default:
      return state;
  }
}

export default signin;
