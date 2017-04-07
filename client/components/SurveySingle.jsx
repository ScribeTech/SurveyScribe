import React from 'react';
import { GridTile } from 'material-ui/GridList';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

const SurveySingle = ({ _id, title }) => (
  <Link to="/edit">
    <GridTile
      key={_id}
      title={title.toUpperCase()}
      actionIcon={
        <div className="actionButtons">
          <FlatButton
            label="Edit"
            containerElement={<Link to="/edit" />}
            linkButton
          />
          <FlatButton
            label="Result"
            containerElement={<Link to="/results" />}
            linkButton
          />
          <FlatButton
            label="Share"
            containerElement={<Link to="/share" />}
            linkButton
          />
        </div>
      }
      className="gridtile"
      titleBackground="rgba(0,0,255,0.3)"
    />
  </Link>
);

SurveySingle.propTypes = {
  _id: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired,
  title: React.PropTypes.string.isRequired
};

export default SurveySingle;
