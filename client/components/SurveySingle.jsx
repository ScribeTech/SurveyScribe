import React from 'react';

const SurveySingle = (props) => {
  const componentDidMount = () => {
    console.log("props", this.props.surveysingle);
  };

  return (
    <div>
      <div>
        {props.surveysingle.title}
      </div>
      {props.surveysingle.questions.map((question) => {
        return (
          <div className="question">
            <div className="questionLabel">
              {question.label}
            </div>
            {question.options.map((option) => {
              return (
                <div className="option">
                  <div className="optionLabel">
                    {option.label}
                  </div>
                  <div className="optionVotes">
                    {option.votes}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SurveySingle;
