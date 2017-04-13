import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import Layout from './Layout';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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
  }
};

const SignIn = () => (
  <Layout title="Sign In">
    <div>
      <Card style={styles.main}>
        <CardTitle title="Please Sign Up" />
        <div style={styles.textbox}>
          <TextField
            floatingLabelText="Name"
          />
        </div>
        <div style={styles.textbox}>
          <TextField
            floatingLabelText="Password"
          />
        </div>
        <CardActions>
          <FlatButton style={styles.createaccount} label="Create Account" />
        </CardActions>
      </Card>
    </div>
  </Layout>
);

export default SignIn;
