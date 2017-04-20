import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

import { mongoSurveys } from './data/mongoSurveys';
import { questions } from './data/questions';
import { options } from './data/options';
import { responses } from './data/responses';
import { response } from './data/response';
import { aggregates } from './data/aggregates';
import { normalizeSurveys } from './utilities/normalize';

const surveys = normalizeSurveys(mongoSurveys);
// hard coding the test data for now so i can work on views
const defaultState = {
  surveys,
  questions,
  options,
  responses,
  response: { '58ee63c65a2d576d5125b4c1': {
    question: '58ee63c65a2d576d5125b4c1',
    value: {}
  } },
  aggregates,
  normalizeSurveys,
  signin: {}
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
