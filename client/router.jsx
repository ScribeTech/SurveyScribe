import React from 'react';

import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Import Components
import App from './components/App';
import LandingPage from './components/LandingPage';
import SurveyGrid from './components/SurveyGrid';
import SurveyEdit from './components/SurveyEdit';
import SurveyAnswer from './components/SurveyAnswer';
import Results from './components/Results';
import Finish from './components/Finish';
import NotFoundPage from './components/NotFoundPage';

// Import the Application's State (Redux)
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <IndexRoute component={LandingPage} />
        <Route path="survey" component={SurveyGrid} />
        <Route path="survey/:surveyId/edit" component={SurveyEdit} />
        <Route path="survey/:surveyId/answer" component={SurveyAnswer} />
        <Route path="survey/:surveyId/results" component={Results} />
        <Route path="survey/:surveyId/finish" component={Finish} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);

injectTapEventPlugin();

render(router, document.getElementById('app'));
