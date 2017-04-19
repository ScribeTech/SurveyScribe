import React from 'react';

import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Logo from '../assets/images/logo-light.svg';

const Header = props => (
  <div className="header">
    <Link to="/"><img className="logo" src={Logo} alt="logo" /></Link>
    <div className="right">
      <Link to="/logout"><FlatButton>Log out</FlatButton></Link>
    </div>
  </div>
);

export default Header;
