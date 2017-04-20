import React from 'react';

import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Logo from '../assets/images/logo-light.svg';

const handleClick = (props) => {
  fetch('/api/logout/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((result) => {
    console.log('session deleted');
  })
  .catch((error) => {
    console.log('logout handleClick error', error);
  });
};

const Header = props => (
  <div className="header">
    <Link to="/survey"><img className="logo" src={Logo} alt="logo" /></Link>
    <div className="right">
      <Link to="/"><FlatButton onClick={() => handleClick(props)}>Logout</FlatButton></Link>
    </div>
  </div>
);

export default Header;
