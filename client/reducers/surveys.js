export function surveys(state = [], action) {
  switch (action.type) {
    case 'ADD_SURVEY':
      return [...state,
        {
          id: action.id,
          title: action.title
        }
      ];
    case 'REMOVE_SURVEY':
      return [...state.slice(0, action.i),
        ...state.slice(action.i + 1)
      ];
    case 'EDIT_SURVEY':
      return [
        ...state.slice(0, action.i),
        Object.assign({}, state[action.i], { title: action.title }),
        ...state.slice(action.i + 1)
      ];
    default:
      return state;
  }
}

export default surveys;
