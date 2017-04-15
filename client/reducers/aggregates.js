export function aggregates(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_AGGREGATES':
      return action.aggregates;
    default:
      return state;
  }
}

export default aggregates;
