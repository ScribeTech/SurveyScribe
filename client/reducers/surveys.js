// a reducer takes in two things:
// 1. the action (info about what happened)
// 2. copy of current state

function surveys(state = [], action) {
  console.log('The survey will change');
  switch (action.type) {
    case 'ADD_SURVEY':
      console.log('adding survey!');
      return [
        ...state, {
          title: action.title,
          questions: action.questions
        }
      ];
    case 'EDIT_SURVEY':
      return [
        ...state
      ]
    case 'REMOVE_SURVEY':
    // return updated state
    default:
      return state;
  }
}

export default surveys;
