import React from 'react';

import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
// Material UI
import { syncHistoryWithStore } from 'react-router-redux';
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
import SignIn from './components/SignIn';
import Login from './components/Login';

// Import the Application's State (Redux)
import configureStore from './store';

// Import Styles
import './assets/styles/stylesheet.css';

const checkAuth = (currStore) => {
  const state = currStore.getState();
  if (state.signin.name === undefined) {
    history.push('/login');
    location.reload();
  }
};

async function init() {
  const store = await configureStore();

  const history = syncHistoryWithStore(browserHistory, store);

  // allows automatic (hot) reloads of changed reducer functions
  if (module.hot) {
    module.hot.accept('./reducers/', () => {
      const nextRootReducer = require('./reducers/index.js').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  const router = (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} >
          <IndexRoute component={LandingPage} />
          <Route
            path="/survey"
            component={SurveyGrid}
            onEnter={() => {
              checkAuth(store);
            }}
          />
          <Route path="/signin" component={SignIn} />
          <Route path="/login" component={Login} />
          <Route path="/survey/:surveyID/edit" component={SurveyEdit} />
          <Route path="/survey/:surveyID/answer" component={SurveyAnswer} />
          <Route path="/survey/:surveyID/results" component={Results} onEnter={() => checkAuth(store)} />
          <Route path="/survey/:surveyID/finish" component={Finish} />
          <Route path="*" component={NotFoundPage} />
        </Route>
      </Router>
    </Provider>
  );

  injectTapEventPlugin();

  render(router, document.getElementById('app'));
}

init();
