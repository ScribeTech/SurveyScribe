import React from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Layout from './Layout';

import Layout from './Layout';
import { getSurveys } from '../utilities/apiTalk';

let nameVal = '';
let passWordVal = '';

const styles = {
  main: {
    position: 'relative',
    margin: 'auto',
    maxWidth: '33em'
  },
  signinerror: {
    display: 'block',
    boxSizing: 'border-box',
    background: '#ffe6e6',
    color: '#c86e6e',
    margin: '0 15px',
    padding: '10px',
    border: '1px solid #f5c8c8',
  },
  textbox: {
    width: '100%',
    padding: '0 20px',
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
  } else {
    return (
      <div />
    );
  }
};

const Login = props => (
  <Layout title="Log in">
    <div>
      <Card style={styles.main}>
        <CardTitle title="Log in" />
        <div>
          {renderError(props)}
        </div>
        <div style={styles.textbox}>
          <TextField
            floatingLabelText="Name"
            type="username"
            ref={(name) => { nameVal = name; }}
            fullWidth
          />
        </div>
        <div style={styles.textbox}>
          <TextField
            floatingLabelText="Password"
            type="password"
            ref={(password) => { passWordVal = password; }}
            fullWidth
          />
        </div>
        <CardActions>
          <FlatButton style={styles.createaccount} label="Log In" onClick={() => handleClick(props)} />
          <Link to="/signin" ><FlatButton style={styles.createaccount} label="Create an Account" /></Link>
        </CardActions>
      </Card>
    </div>
  </Layout>
);

export default Login;
