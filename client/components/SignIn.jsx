import React from 'react';

import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { Dark } from './Theme';
import Logo from '../assets/images/logo-dark.svg';

let nameVal = '';
let passWordVal = '';

const handleClick = (props) => {
  fetch('/api/users/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameVal.input.value,
      password: passWordVal.input.value
    })
  })
  .then(response => (response.json()))
  .then((result) => {
    if (result.error) {
      props.errorTrue(result.message);
    } else {
      props.errorFalse();
      browserHistory.push('/login');
    }
  })
  .catch((error) => {
    throw error;
  });
};

const SignIn = props => (
  <Dark>
    <div className="jumbotron">
      <div className="center">
        <div><img className="logo" src={Logo} alt="logo" /></div>
        {props.signin.error ? (
          <div className="error">
            {props.signin.message}
          </div>
        ) : ''}
        <TextField
          floatingLabelText="Name"
          ref={(name) => { nameVal = name; }}
          fullWidth
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          ref={(password) => { passWordVal = password; }}
          fullWidth
        />
        <RaisedButton
          label="Create Account"
          className="button"
          primary
          fullWidth
          onClick={() => handleClick(props)}
        />
        <Link to="/login" className="button"><FlatButton fullWidth>Login</FlatButton></Link>
      </div>
    </div>
  </Dark>
);

SignIn.propTypes = {}.isRequired;

export default SignIn;
