import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';

const styles = {
  main: {
    position: 'relative',
    top: 150,
    margin: 'auto',
    width: 600
  }
}

const SignIn = () => (
  <div>
    <Card style={styles.main}>
      <CardTitle title="Please Sign Up" />
      SignIn
    </Card>
  </div>
);

export default SignIn;
