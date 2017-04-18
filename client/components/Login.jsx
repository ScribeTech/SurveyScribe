import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import Layout from './Layout';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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
    marginLeft: 20,
    background: '#ffe6e6',
    color: '#c86e6e',
    padding: '10px',
    border: '1px solid #f5c8c8',
    width: 260
  }
};

const handleClick = (props) => {
  fetch('/api/login/', {
    method: 'POST',
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
      props.errorTrue(result.error);
    } else {
      props.errorFalse();
      props.editUser(result._id, result.name);
    }
  })
  .catch((error) => {
    throw error;
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
        <CardTitle title="Please Log In" />
        <div>
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
            type="password"
            ref={(password) => { passWordVal = password; }}
          />
        </div>
        <CardActions>
          <FlatButton style={styles.createaccount} label="Log In" onClick={() => handleClick(props)} />
        </CardActions>
      </Card>
    </div>
  </Layout>
);

export default Login;
