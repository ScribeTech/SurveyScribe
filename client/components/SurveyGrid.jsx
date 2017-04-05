import React from 'react';
import SurveySingle from './SurveySingle.jsx';
import {GridList} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const Survey = (props) => {
  const concomponentDidMount = () => {
    console.log('props', props.surveys);
  };

  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 1000,
      height: 850,
      padding: 25
    },
  };

  return (
    <MuiThemeProvider>
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
          padding={8}
        >
          <Subheader>Your Surveys</Subheader>
          {props.surveys.map((survey, i) => (
            <SurveySingle surveysingle={survey} key={i} />
          ))}
        </GridList>
      </div>
    </MuiThemeProvider>
  );
};

export default Survey;

