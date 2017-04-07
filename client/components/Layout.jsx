import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header';
import '../assets/normalize.css';
import '../assets/stylesheet.css';

const Layout = props => (
  <MuiThemeProvider>
    <div>
      <Header {...props} />
      <div className="content">
      {console.log("props",  props)}
        {props.children}
      </div>
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ]).isRequired,
};

export default Layout;
