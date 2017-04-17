export function remove(state = {}, action) {
  const result = Object.assign({}, state);
  delete result[action.id];
  return result;
}

export default remove;
