import React from 'react';
import { GridList } from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

const Edit = (props) => {
  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    gridList: {
      width: 1000,
      height: 850,
      padding: 25
    },
    paper: {
      height: 100,
      width: 800,
      margin: 10,
      textAlign: 'center',
      display: 'inline-block'
    }
  };

  return (
    <MuiThemeProvider>
      <div style={styles.root}>
        <GridList
          cellHeight={150}
          style={styles.gridList}
          padding={8}
          cols={1}
        >
          {props.surveys.map((survey, i) => (
            <Paper style={styles.paper} zDepth={2} />
          ))}
        </GridList>
      </div>
    </MuiThemeProvider>
  );
};

export default Edit;
