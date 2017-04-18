import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

import { mongoSurveys } from './data/mongoSurveys';
import { questions } from './data/questions';
import { options } from './data/options';
import { normalizeSurveys } from './utilities/normalize';
import { surveys } from './data/surveys';


const defaultState = {
  surveys,
  questions,
  options,
  responses: {},
  response: {},
  aggregates: {},
  signin: []
};

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

// allows automatic (hot) reloads of changed reducer functions
if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index.js').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
