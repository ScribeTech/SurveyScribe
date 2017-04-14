export function signin(state = [], action) {
  switch (action.type) {
    case 'TOGGLE_ERROR':
      return [
        ...state.slice(0, action.i),
        Object.assign({}, state[action.i], { selected: !state[action.i].selected }),
        ...state.slice(action.i + 1)
      ];
    case 'UPDATE_STATE':
      return action.signin;
    default:
      return state;
  }
}

export default signin;
