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
  }
};

const handleClick = (props) => {
  console.log("nameVal", nameVal)
  console.log("passWordVal", passWordVal)
  // fetch('/api/users/:user', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     title: 'New Survey',
  //     questions: []
  //   })
  // })
  // .then(response => response.json())
  // .then((result) => {
  //   // Adding survey to state and changing the view to edit
  //   props.addSurvey(result._id, result.title);
  //   browserHistory.push(`survey/${result._id}/${props.surveys.length}/edit`);
  // })
  // .catch((error) => {
  //   throw error;
  // });
};

const SignIn = (props) => (
  <Layout title="Sign In">
    <div>
      <Card style={styles.main}>
        <CardTitle title="Please Sign Up" />
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
