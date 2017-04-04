import React from 'react';

import { render } from 'react-dom';

// Import Components
import App from './components/App.jsx';
import LandingPage from './components/LandingPage.jsx';
import SurveyGrid from './components/SurveyGrid.jsx';
import SurveyEdit from './components/SurveyEdit.jsx';
import SurveyAnswer from './components/SurveyAnswer.jsx';
import Results from './components/Results.jsx';
import Finish from './components/Finish.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store.jsx';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <IndexRoute component={LandingPage} />
        <Route path="survey" component={SurveyGrid} />
        <Route path="survey/:surveyId/edit" component={SurveyEdit} />
        <Route path="survey/surveyId/answer" component={SurveyAnswer} />
        <Route path="survey/:surveyId/results" component={Results} />
        <Route path="survey/:surveyId/finish" component={Finish} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
