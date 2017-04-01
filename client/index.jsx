import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App.jsx';
import container from './Containers/Container.jsx';

const store = container();

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
);
