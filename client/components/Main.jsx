import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Main = props => (
  <MuiThemeProvider>
    {React.cloneElement(props.children, props)}
  </MuiThemeProvider>
);

Main.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Main;
