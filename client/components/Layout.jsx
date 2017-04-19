import React from 'react';

import { Light } from './Theme';
import Header from './Header';

const Layout = props => (
  <Light>
    <div className="layout-semiwhole">
      <Header />
      {props.title ? <h1>{props.title}</h1> : ''}
      {props.children}
    </div>
  </Light>
);

Layout.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ]).isRequired,
};

Layout.defaultProps = {
  title: undefined
};

export default Layout;
