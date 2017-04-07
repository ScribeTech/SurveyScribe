import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import styling
import '../assets/stylesheet.css';

const Main = props => (
  <MuiThemeProvider>
    {React.cloneElement(props.children, props)}
  </MuiThemeProvider>
);

Main.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Main;
