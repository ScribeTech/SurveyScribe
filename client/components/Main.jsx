import React from 'react';

// Components
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// Icons
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

// Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Styling
import '../assets/normalize.css';
import '../assets/stylesheet.css';

const muiTheme = getMuiTheme();
// import { deepBlue500 } from 'material-ui/styles/colors';
// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: deepOrange500
//   },
// });

const styles = {
  title: {
    cursor: 'pointer'
  }
};

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Main = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppBar
        title={<span style={styles.title}>{props.title}</span>}
        onTitleTouchTap={props.onTitleTouchTap}
        iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
        iconElementRight={
          <IconMenu iconButtonElement={<IconButton touch><NavigationExpandMoreIcon /></IconButton>}>
            {props.actions.map(p => (
              <MenuItem primaryText={p.label} onClick={p.callback} onTap={p.callback} />
            ))}
          </IconMenu>
        }
      />
      {React.cloneElement(props.children, props)}
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
