import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { surveys } from './surveys';
import { questions } from './questions';
import { options } from './options';
import { signin } from './signin';

const rootReducer = combineReducers({
  surveys,
  questions,
  options,
  signin,
  routing: routerReducer
});

export default rootReducer;
