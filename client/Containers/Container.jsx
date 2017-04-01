import { createStore } from 'redux';
import rootReducer from '../Reducers/index.jsx';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState
  );
}
