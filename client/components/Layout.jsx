import React from 'react';

import Header from './Header';

const Layout = props => (
  <div>
    <Header {...props} />
    <div className="content">
      {props.children}
    </div>
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ]).isRequired,
};

export default Layout;
