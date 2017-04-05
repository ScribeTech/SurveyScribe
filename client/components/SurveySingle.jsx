import React from 'react';
import { GridTile } from 'material-ui/GridList';
import { Link } from 'react-router';

const SurveySingle = (props) => {
  return (
    <Link to="/edit">
      <GridTile
        key={props.surveysingle._id}
        title={props.surveysingle.title}
        actionIcon={<button >testbutton </button>}
        className="gridtile"
        titleBackground="rgba(0,0,255,0.2)"
      >
        <img className="surveyPic" src="http://www.fmsi.com/fullpanel/uploads/files/survey-icon.png" alt="asdf" />
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
