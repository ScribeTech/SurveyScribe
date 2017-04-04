import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './Containers/Container.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Survey from './components/Survey/Survey.jsx';
import Edit from './components/Edit/Edit.jsx';
import Results from './components/Results/Results.jsx';
import Answer from './components/Answer/Answer.jsx';
import Finish from './components/Finish/Finish.jsx';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.jsx';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={LandingPage} />
      <Route path="/survey" component={Survey} />
      <Route path="/edit" component={Edit} />
      <Route path="/results" component={Results} />
      <Route path="/answer" component={Answer} />
      <Route path="/finish" component={Finish} />
      <Route path="*" component={NotFoundPage} />
    </Router>
  </Provider>, document.getElementById('app')
);
