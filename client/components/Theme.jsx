import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator';

const colors = {
  black: '#444',
  white: '#FFF',
  grey: '#EEE',
  primary: '#3498db',
  primaryDark: '#2980b9',
  error: '#E74C3C'
};

const light = {
  palette: {
    textColor: colors.black,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey,
    primary1Color: colors.primary,
    primary2Color: colors.primaryDark,
  }
};

const dark = {
  palette: {
    textColor: colors.white,
    alternateTextColor: colors.white,
    canvasColor: colors.primaryDark,
    borderColor: fade(colors.white, 0.25),
    primary1Color: colors.primary,
    primary2Color: colors.primaryDark,
    disabledColor: fade(colors.white, 0.75)
  },
  snackbar: {
    textColor: colors.white,
    backgroundColor: colors.black
  },
  textField: {
    floatingLabelColor: colors.white,
    focusColor: colors.white,
    textColor: colors.white,
    disabledTextColor: fade(colors.white, 0.75)
  }
};

const Dark = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(dark)}>
    <div className="dark">{props.children}</div>
  </MuiThemeProvider>
);

Dark.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ]).isRequired
};

const Light = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(light)}>
    <div className="light">{props.children}</div>
  </MuiThemeProvider>
);

Light.propTypes = Dark.propTypes;

export { Light, Dark };
