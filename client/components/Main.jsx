import React from 'react';
import { getSurveys } from '../utilities/apiTalk';

const Main = props =>
  (<div onLoad={() => getSurveys(props)} >
    { React.cloneElement(props.children, props) }
  </div>);

Main.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Main;
