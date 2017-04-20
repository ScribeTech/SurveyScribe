import React from 'react';
import { connect } from 'react-redux';

import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { Provider } from 'react-redux';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
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
import store, { history } from './store';

// Import Styles
import './assets/stylesheet.css';
import './assets/content.css';

const checkAuth = (store, Component) => {
  let state = store.getState();
  if (state.signin.name === undefined) {
    history.push('/login');
    location.reload();
  }
}

const router = (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} >
          <IndexRoute component={LandingPage} />
          <Route path="/survey" component={SurveyGrid} onEnter={() =>checkAuth(store)} />
          <Route path="/signin" component={SignIn} />
          <Route path="/login" component={Login} />
          <Route path="/survey/:surveyID/edit" component={SurveyEdit} />
          <Route path="/survey/:surveyID/answer" component={SurveyAnswer} />
          <Route path="/survey/:surveyID/results" component={Results} />
          <Route path="/survey/:surveyID/finish" component={Finish} />
          <Route path="*" component={NotFoundPage} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

injectTapEventPlugin();

render(router, document.getElementById('app'));
