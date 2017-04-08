import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

import { pretendMongo } from './data/pretendMongoSurveys';
import { normalize, denormalize } from './normalize';

const defaultState = normalize(pretendMongo);
console.log('defaultState', defaultState);

const convertedSurvey = denormalize(defaultState.surveys, defaultState.questions,
                                    defaultState.options, 0);
console.log('convertedSurvey', convertedSurvey);

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);
console.log('store', store.getState());

export const history = syncHistoryWithStore(browserHistory, store);

// allows automatic (hot) reloads of changed reducer functions
if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index.js').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
