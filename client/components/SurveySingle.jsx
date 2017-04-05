import React from 'react';
import { GridTile } from 'material-ui/GridList';
import { Link } from 'react-router';
import Assignment from '../styles/ic_assignment_black_24dp_1x.png';

const SurveySingle = (props) => {
  const componentDidMount = () => {
    console.log("props", this.props.surveysingle);
  };

  return (
    <Link to="/edit">
      <GridTile
        key={props.surveysingle._id}
        title={props.surveysingle.title}
        actionIcon={<button >testbutton </button>}
        className="gridtile"
        titleBackground="rgba(0,0,255,0.2)"
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
