import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Main = props => (
  <div>
    {React.cloneElement(props.children, props)}
  </div>
);

Main.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Main;
