import React from 'react';
import { GridList } from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import SurveyEditSingle from './SurveyEditSingle.jsx';

const Edit = (props) => {
  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'

    },
    gridList: {
      width: 1000,
      padding: 25
    },
    paper: {
      height: 200,
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
          cellHeight={'auto'}
          style={styles.gridList}
          padding={8}
          cols={1}
        >
          {props.surveys.map((survey, i) => (
            <Paper style={styles.paper} key={i} zDepth={2}>
              <SurveyEditSingle survey={survey} />
            </Paper>
          ))}
        </GridList>
      </div>
    </MuiThemeProvider>
  );
};

export default Edit;
