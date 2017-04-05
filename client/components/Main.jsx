import React from 'react';
import { Link } from 'react-router';

const Main = props => (
  <div>
    <h1>
      <Link to="/survey">SurveyScribe</Link>
    </h1>
    {React.cloneElement(props.children, props)}
  </div>
);

Main.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Main;
