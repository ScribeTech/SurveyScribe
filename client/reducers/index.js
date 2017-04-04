import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import surveys from './surveys';
import questions from './questions';
import options from './options';

const rootReducer = combineReducers({ surveys, questions, options, routing: routerReducer });
export default rootReducer;
