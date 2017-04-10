import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { browserHistory as history } from 'react-router';

const Header = props => (
  <AppBar
    title={props.title}
    onTitleTouchTap={props.onTitleTouchTap}
    iconElementLeft={
      <IconButton onClick={() => history.goBack()}>
        <NavigationArrowBack color="white" />
      </IconButton>
    }
    iconElementRight={props.actions &&
      <IconMenu iconButtonElement={<IconButton touch><MoreVertIcon /></IconButton>}>
        {props.actions.map(p => (
          <MenuItem primaryText={p.label} onClick={p.callback} />
        ))}
      </IconMenu>
    }
  />
);

Header.propTypes = {
  onTitleTouchTap: React.PropTypes.func,
  title: React.PropTypes.string,
  actions: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      callback: React.PropTypes.func.isRequired
    })
  )
};

Header.defaultProps = {
  onTitleTouchTap: () => { /* no-op */ },
  title: 'Survey Scribe',
  actions: null
};

export default Header;
