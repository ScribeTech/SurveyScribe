import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { surveys } from './surveys';
import { questions } from './questions';
import { options } from './options';
import { signin } from './signin';
import { response } from './response';
import { responses } from './responses';
import { aggregates } from './aggregates';

const rootReducer = combineReducers({
  surveys,
  questions,
  options,
  responses,
  response,
  aggregates,
  signin,
  routing: routerReducer
});

export default rootReducer;
