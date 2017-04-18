import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from './Header';
import Content from './Content';
import theme from '../utilities/theme';

const Layout = props => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme.light)}>
    <div>
      <Header {...props} />
      <Content>
        {props.children}
      </Content>
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
