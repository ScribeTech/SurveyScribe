import React from 'react';

import Header from './Header';
import Content from './Content';
import { Light } from './Theme';

const Layout = props => (
  <Light>
    <div>
      <Header {...props} />
      <Content>
        {props.children}
      </Content>
    </div>
  </Light>
);

Layout.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ]).isRequired,
};

export default Layout;
