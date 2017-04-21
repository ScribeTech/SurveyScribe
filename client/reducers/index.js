import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { surveys } from './surveys';
import { questions } from './questions';
import { options } from './options';
import { signin } from './signin';
import { response } from './response';
import { responses } from './responses';
import { aggregates } from './aggregates';
import { snackbar } from './snackbar';
import { warning } from './warning';

const rootReducer = combineReducers({
  surveys,
  questions,
  options,
  responses,
  response,
  aggregates,
  signin,
  snackbar,
  warning,
  routing: routerReducer
});

export default rootReducer;
