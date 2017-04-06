import React from 'react';
import { GridTile } from 'material-ui/GridList';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const SurveySingle = (props) => {
  const style = {
    padding: '4px',
    'font-size': '4px',
  };

  return (
    <Link to="/edit">
      <GridTile
        key={props.surveysingle._id}
        title={props.surveysingle.title.toUpperCase()}
        actionIcon={
          <div className="actionButtons">
            <Link to="/edit"><button>Edit</button></Link>
            <Link to="/results"><button>Result</button></Link>
            <Link to="/share"><button>Share</button></Link>
          </div>
        }
        className="gridtile"
        titleBackground="rgba(0,0,255,0.3)"
      >
      </GridTile>
    </Link>
  );
};

export default SurveySingle;


/*
<div>
  <div>
    title: {props.surveysingle.title}
  </div>
  {props.surveysingle.questions.map((question) => {
    return (
      <div className="question">
        <div className="questionLabel">
          question: {question.label}
        </div>
        {question.options.map((option) => {
          return (
            <div className="option">
              <div className="optionLabel">
                option: {option.label}
              </div>
              <div className="optionVotes">
                votes: {option.votes}
              </div>
            </div>
          );
        })}
      </div>
    );
  })}
</div>
*/
