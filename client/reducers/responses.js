export function responses(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_RESPONSES':
      return action.responses;
    default:
      return state;
  }
}

export default responses;
