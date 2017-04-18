import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

import { mongoSurveys } from './data/mongoSurveys';
import { questions } from './data/questions';
import { options } from './data/options';
import { normalizeSurveys } from './utilities/normalize';

const surveys = normalizeSurveys(mongoSurveys);
//hard coding the test data for now so i can work on views
const defaultState = {
  surveys,
  questions: {
    '58ee6466aa8ac36d6d74fe9f': {
      id: '58ee6466aa8ac36d6d74fe9f',
      kind: 'Scale',
      required: false,
      title: 'How much do you like burritos?',
      min: 0,
      max: 10 },
    '58ee6466aa8ac36d6d74fe9e': {
      id: '58ee6466aa8ac36d6d74fe9e',
      kind: 'Text',
      required: false,
      title: 'Explain your rating.',
      max: 1000 },
    '58ee63c65a2d576d5125b4c1': {
      id: '58ee63c65a2d576d5125b4c1',
      kind: 'Select',
      required: false,
      title: 'What is your favorite color?',
      maxSelection: 0
    }
  },
  options: {
    '58ee63c65a2d576d5125b4c1': [
      { "id": "58ee6466aa8ac36d6d74fe9a", "label": "Red"},
      { "id": "58ee6466aa8ac36d6d74fe9b", "label": "Green"},
      { "id": "58ee6466aa8ac36d6d74fe9c", "label": "Blue"}
    ]
  },
  responses: {
  '58ee6904fdebd16dfdd99f91': {
    '58ee6466aa8ac36d6d74fe9f': { question: '58ee6466aa8ac36d6d74fe9f', response: 10 },
    '58ee6466aa8ac36d6d74fe9e': { question: '58ee6466aa8ac36d6d74fe9e', response: 'I love them with all my soul!!!' },
    '58ee63c65a2d576d5125b4c1': { question: '58ee63c65a2d576d5125b4c1', response: ['58ee6466aa8ac36d6d74fe9a', '58ee6466aa8ac36d6d74fe9b', '58ee6466aa8ac36d6d74fe9c'] } },
  '58ee6904fdebd16dfdd99f92': {
    '58ee6466aa8ac36d6d74fe9f': { question: '58ee6466aa8ac36d6d74fe9f', response: 8 },
    '58ee6466aa8ac36d6d74fe9e': { question: '58ee6466aa8ac36d6d74fe9e', response: 'I love them muchly, but they can sometimes be made badly.' },
    '58ee63c65a2d576d5125b4c1': { question: '58ee63c65a2d576d5125b4c1', response: ['58ee6466aa8ac36d6d74fe9a', '58ee6466aa8ac36d6d74fe9b'] } },
  '58ee6904fdebd16dfdd99f93': {
    '58ee6466aa8ac36d6d74fe9f': { question: '58ee6466aa8ac36d6d74fe9f', response: 1 },
    '58ee6466aa8ac36d6d74fe9e': { question: '58ee6466aa8ac36d6d74fe9e', response: 'I have no taste.' },
    '58ee63c65a2d576d5125b4c1': { question: '58ee63c65a2d576d5125b4c1', response: ['58ee6466aa8ac36d6d74fe9a'] }
  }
},
  aggregates: {
  '58ee6466aa8ac36d6d74fe9f': [ 10, 8, 1 ],
  '58ee6466aa8ac36d6d74fe9e': [
    'I love them with all my soul!!!',
    'I love them muchly, but they can sometimes be made badly.',
    'I have no taste.'
  ],
  '58ee63c65a2d576d5125b4c1': {
    '58ee6466aa8ac36d6d74fe9a': 3,
    '58ee6466aa8ac36d6d74fe9b': 2,
    '58ee6466aa8ac36d6d74fe9c': 1
  }
},
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
