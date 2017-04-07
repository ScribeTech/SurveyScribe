import React from 'react';
import { GridList } from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import SurveyEditSingle from './SurveyEditSingle.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
      width: 800,
      margin: 10,
      padding: 15,
      display: 'inline-block'
    },
    actionButton: {
      marginRight: 20
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
              <SurveyEditSingle survey={survey} questions={props.surveys.questions} options={props.surveys.options} />
            </Paper>
          ))}
        </GridList>
        <FloatingActionButton className="floatingActionButton" style={styles.actionButton} zDepth={3}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    </MuiThemeProvider>
  );
};

export default Edit;
