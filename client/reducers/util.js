// removes a key from an Object
export function remove(state = {}, id) {
  const result = Object.assign({}, state);
  delete result[id];
  return result;
}

export default remove;
