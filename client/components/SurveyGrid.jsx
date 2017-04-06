import React from 'react';

import { Link } from 'react-router';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';

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
};

const Actions = props => (
  <IconMenu iconButtonElement={<IconButton><NavigationExpandMoreIcon color="white" /></IconButton>}>
    <MenuItem primaryText="Edit" />
    <MenuItem primaryText="Results" />
    <MenuItem primaryText="Share" />
  </IconMenu>
);

const SurveyTile = props => (
  <GridTile
    title={props.title}
    actionIcon={<Actions />}
  />
);

const SurveyGrid = props => (
  <div style={styles.root}>
    <GridList cellHeight={180} style={styles.gridList}>
      {props.surveys.map(survey => <SurveyTile key={survey.id} {...survey} />)}
    </GridList>
  </div>
);

export default SurveyGrid;
