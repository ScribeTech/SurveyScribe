import { createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { localStorage } from 'redux-persist/storages';
import rootReducer from './reducers/index';

// hard coding the test data for now so i can work on views
<<<<<<< HEAD
const defaultState = {
  surveys: {},
  questions: {},
  options: {},
  responses: {},
  response: {},
  aggregates: {},
  signin: [],
  save: false,
  warning: false
};
=======
>>>>>>> Add data persistence

const enhancers = compose(
  autoRehydrate(),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default function configureStore() {
  return new Promise((resolve, reject) => {
    try {
      const store = createStore(
        rootReducer,
        undefined,
        enhancers
      );

      persistStore(
        store,
        { storage: localStorage },
        () => resolve(store)
      );
      window.devToolsExtension ? window.devToolsExtension() : f => f;
    } catch (e) {
      reject(e);
    }
  });
}
