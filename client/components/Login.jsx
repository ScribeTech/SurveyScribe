import React from 'react';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { Dark } from './Theme';
import Logo from '../assets/images/logo-dark.svg';


import Layout from './Layout';
import { getSurveys } from '../utilities/apiTalk';

let nameVal = '';
let passWordVal = '';

const handleClick = (props) => {
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
  .then((result) => {
    if (result.error) {
      props.errorTrue(result.error);
    } else {
      props.errorFalse();
      props.editUser(result._id, result.name);
      getSurveys(props, '/survey');
    }
  })
  .catch((error) => {
    console.log('login handleClick error', error);
  });
};

const Login = props => (
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
          label="Login"
          className="button"
          primary
          fullWidth
          onClick={() => handleClick(props)}
        />
        <Link to="/signin" className="button"><FlatButton fullWidth>Create Account</FlatButton></Link>
      </div>
    </div>
  </Dark>
);

Login.propTypes = {}.isRequired;

export default Login;
