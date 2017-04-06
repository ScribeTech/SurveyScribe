import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from './reducers/index';

import surveys from './data/separated/surveys.js';
import options from './data/separated/options.js';
import questions from './data/separated/questions.js';

const defaultState = {
  surveys: { surveys, options, questions }
};

console.log('defaultState', defaultState);

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);
console.log('store', store.getState());

export const history = syncHistoryWithStore(hashHistory, store);

// allows automatic (hot) reloads of changed reducer functions
if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index.js').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
