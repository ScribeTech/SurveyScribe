import React from 'react';

import Header from './Header';
import Content from './Content';

const Layout = props => (
  <div>
    <Header {...props} />
    <Content>
      {props.children}
    </Content>
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ]).isRequired,
};

export default Layout;
