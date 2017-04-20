import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Card } from 'material-ui/Card';
import ClipboardButton from 'react-clipboard.js';
import { browserHistory as history, Link } from 'react-router';
import Clipboard from '../assets/Copy.svg';

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
        {props.actions.map((p) => {
          if (p.label === 'Share') {
            return (
              <MenuItem
                key={p.label}
                primaryText={p.label}
                menuItems={[
                  <div className="copy">
                    <Card />
                    Copy This Link
                    <div className="link">
                      <input id="url" className="url" type="text" value={`${window.location.href.split('/s')[0]}/survey/${window.location.href.split('/')[4]}/answer`} readOnly />
                      <ClipboardButton className="copybtn" data-clipboard-target="#url">
                        <img className="clipboard" alt="Copy to clipboard" src={Clipboard} />
                      </ClipboardButton>
                    </div>
                    Use the button to copy the link
                  </div>
                ]}
              />
            );
          } else if (p.label === 'Delete') {
            return (<Link key={p.label} to="/survey"><MenuItem primaryText={p.label} onClick={p.callback} /> </Link>);
          } else {
            return (<MenuItem key={p.label} primaryText={p.label} onClick={p.callback} />);
          }
        }
        )}
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
