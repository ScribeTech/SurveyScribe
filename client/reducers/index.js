import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import surveys from './surveys';
import options from './options';
import questions from './questions';

const rootReducer = combineReducers({ surveys, questions, options, routing: routerReducer });

export default rootReducer;
