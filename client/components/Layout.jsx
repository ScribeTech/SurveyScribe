import React from 'react';

import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

// Styles
import '../assets/normalize.css';
import '../assets/stylesheet.css';

const Layout = props => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title={props.title}
        onTitleTouchTap={props.onTitleTouchTap}
        iconElementLeft={
          <Link to={props.back}>
            <IconButton><NavigationArrowBack color="white" /></IconButton>
          </Link>
        }
        iconElementRight={props.actions &&
          <IconMenu iconButtonElement={<IconButton touch><MoreVertIcon /></IconButton>}>
            {props.actions.map(p => (
              <MenuItem primaryText={p.label} onClick={p.callback} onTouchTap={p.callback} />
            ))}
          </IconMenu>
        }
      />
      <div>
        {props.children}
      </div>
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: React.PropTypes.oneOfType(
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ).isRequired,
  onTitleTouchTap: React.PropTypes.func,
  title: React.PropTypes.string,
  actions: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      callback: React.PropTypes.func.isRequired
    })
  ),
  back: React.PropTypes.string
};

Layout.defaultProps = {
  onTitleTouchTap: () => { /* no-op */ },
  title: 'Survey Scribe',
  actions: null,
  back: '/'
};

export default Layout;
