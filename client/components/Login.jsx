import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import Logo from '../assets/images/logo-dark.svg';
import { Dark } from './Theme';


import Layout from './Layout';
import { getSurveys } from '../utilities/apiTalk';

let nameVal = '';
let passWordVal = '';

const styles = {
  signinerror: {
    display: 'block',
    boxSizing: 'border-box',
    background: '#ffe6e6',
    color: '#c86e6e',
    margin: '0 15px',
    padding: '10px',
    border: '1px solid #f5c8c8',
  }
};

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

const renderError = (props) => {
  renderError.propTypes = {}.isRequired;

  if (props.signin.error) {
    return (
      <div style={styles.signinerror}>
        {props.signin.message}
      </div>
    );
  }

  return '';
};

const Login = props => (
  <Dark>
    <div className="jumbotron">
      <div className="center">
        <div><img className="logo" src={Logo} alt="logo" /></div>
        {renderError(props)}
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
        <RaisedButton primary fullWidth label="Log In" onClick={() => handleClick(props)} />
        <Link to="/signin"><FlatButton fullWidth>Create Account</FlatButton></Link>
      </div>
    </div>
  </Dark>
);

export default Login;
