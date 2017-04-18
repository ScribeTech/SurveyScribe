import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator';

const light = {
  palette: {
    textColor: '#666',
    alternateTextColor: '#FFF',
    canvasColor: '#FFF',
    borderColor: '#EEE',
    primary1Color: '#3498db',
    primary2Color: '#2980b9',
  }
};

const dark = {
  palette: {
    textColor: '#FFF',
    alternateTextColor: '#FFF',
    canvasColor: '#2980b9',
    borderColor: fade('#FFF', 0.25),
    primary1Color: '#3498db',
    primary2Color: '#2980b9',
    disabledColor: fade('#FFF', 0.75)
  }
};

const Dark = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(dark)}>
    <div>{props.children}</div>
  </MuiThemeProvider>
);

Dark.propTypes = {
  children: React.PropTypes.element.isRequired
};

const Light = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(light)}>
    <div>{props.children}</div>
  </MuiThemeProvider>
);

Light.propTypes = {
  children: React.PropTypes.element.isRequired
};

export { Light, Dark };
