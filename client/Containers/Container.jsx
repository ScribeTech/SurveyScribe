import { createStore } from 'redux';
import rootReducer from '../Reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState
  );
}
