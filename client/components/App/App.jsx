import React from 'react';
import { Provider } from 'react-redux';
import container from '../../Containers/Container';

const store = container();

const App = () => (
  <Provider store={store}>
    <p>Survey Scribe</p>
  </Provider>
);

export default App;
