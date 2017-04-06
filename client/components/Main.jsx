import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Main = props => (
  <MuiThemeProvider>
    {React.cloneElement(props.children, props)}
  </MuiThemeProvider>
);

Main.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Main;
