import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './Containers/Container.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Survey from './components/Survey/Survey.jsx';
import Edit from './components/Edit/Edit.jsx';
import Results from './components/Results/Results.jsx';
import Answer from './components/Answer/Answer.jsx';
import Finish from './components/Finish/Finish.jsx';
import NotFoundPage from './components/NotFoundPage/NotFoundPage.jsx';
import { createBrowserHistory } from 'history';

const store = configureStore();

const history = syncHistoryWithStore(createBrowserHistory(), store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={LandingPage}>
        <IndexRoute component={LandingPage} />
        <Route path="/survey" components={Survey}>
          <Route path="survey/:id/edit" component={Edit} />
          <Route path="survey/:id/results" component={Results} />
          <Route path="survey/:id/answer" component={Answer} />
          <Route path="survey/:id/finish" component={Finish} />
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>, document.getElementById('app')
);


/*
render(
  <Provider store={store}>
    <Route path="/" component={LandingPage}>
      <IndexRoute component={LandingPage} />
      <Route path="/survey" components={Survey}>
        <Route path="survey/:id/edit" component={Edit} />
        <Route path="survey/:id/results" component={Results} />
        <Route path="survey/:id/answer" component={Answer} />
        <Route path="survey/:id/finish" component={Finish} />
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Provider>, document.getElementById('app')
);
*/