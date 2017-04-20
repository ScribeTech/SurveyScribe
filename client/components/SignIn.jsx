import React from 'react';

import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import { Dark } from './Theme';
import Logo from '../assets/images/logo-dark.svg';
import { getSurveys } from '../utilities/apiTalk';

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
      fetch('/api/login/', {
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
      .then(response => response.json())
      .then((LoginResult) => {
        if (LoginResult.error) {
          props.errorTrue(LoginResult.error);
        } else {
          props.errorFalse();
          props.editUser(LoginResult._id, LoginResult.name);
          getSurveys(props, '/survey');
        }
      })
      .catch((error) => {
        console.log('login handleClick error', error);
      });
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
    <Snackbar
      open={props.signin.error || false}
      message={props.signin.message || ''}
      autoHideDuration={4000}
    />
  </Dark>
);

SignIn.propTypes = {}.isRequired;

export default SignIn;
