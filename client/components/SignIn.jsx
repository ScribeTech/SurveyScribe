import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import Layout from './Layout';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';

let nameVal = '';
let passWordVal = '';

const styles = {
  main: {
    position: 'relative',
    top: 150,
    margin: 'auto',
    width: 600
  },
  textbox: {
    marginLeft: 20
  },
  createaccount: {
    marginTop: 30
  },
  signinerror: {
    display: 'block'
  }
};

const handleClick = (props) => {
  fetch('/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameVal.input.value,
      password: passWordVal.input.value
    })
  })
  .then((response) => {
    console.log("response", response)

    return response.json();
  })
  .then((result) => {
    if (result.error) {
      console.log(result.message)
      console.log("props", props)
      props.toggleError(0)
    }
  })
  .catch((error) => {
    throw error;
  });
};

const renderError = (props) => {
  console.log("props renderError", props)
}

const SignIn = (props) => (
  <Layout title="Sign In">
    <div>
      <Card style={styles.main}>
        <CardTitle title="Please Sign Up" />
        <div style={styles.signinerror}>
          {renderError(props)}
        </div>
        <div style={styles.textbox}>
          <TextField
            floatingLabelText="Name"
            ref={(name) => { nameVal = name; }}
          />
        </div>
        <div style={styles.textbox}>
          <TextField
            floatingLabelText="Password"
            ref={(password) => { passWordVal = password; }}
          />
        </div>
        <CardActions>
          <FlatButton style={styles.createaccount} label="Create Account" onClick={() => handleClick(props)} />
        </CardActions>
      </Card>
    </div>
  </Layout>
);

export default SignIn;
