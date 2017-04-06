import React from 'react';

// Components
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

const Main = props => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title={props.title}
        onTitleTouchTap={props.onTitleTouchTap}
        iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
        iconElementRight={
          <IconMenu iconButtonElement={<IconButton touch><MoreVertIcon /></IconButton>}>
            {props.actions.map(p => (
              <MenuItem primaryText={p.label} onClick={p.callback} onTap={p.callback} />
            ))}
          </IconMenu>
        }
      />
      <div>{React.cloneElement(props.children, props)}</div>
    </div>
  </MuiThemeProvider>
);

Main.propTypes = {
  children: React.PropTypes.element.isRequired,
  onTitleTouchTap: React.PropTypes.func,
  title: React.PropTypes.string,
  actions: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      callback: React.PropTypes.func.isRequired
    })
  )
};

Main.defaultProps = {
  onTitleTouchTap: () => { /* no-op */ },
  title: 'Survey Scribe',
  actions: [
    { label: 'Save', callback: () => {} },
    { label: 'Share', callback: () => {} },
    { label: 'Delete', callback: () => {} }
  ]
};

export default Main;
