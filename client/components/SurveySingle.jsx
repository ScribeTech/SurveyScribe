import React from 'react';

const SurveySingle = React.createClass({

  componentDidMount() {
    console.log("props", this.props.surveysingle);
  },

  render() {
    return (
      <div>
        <div>
          {this.props.surveysingle.title}
        </div>
        <div>
          {this.props.surveysingle.questions.map((question) => {
            return (
              <div>
                <div className="questionLabel">
                  {question.label}
                </div>
                <div>
                  {question.options.map((option, i) => {
                    return (
                      <div>
                        <div>
                          {option.label}
                        </div>
                        <div>
                          {option.votes}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

export default SurveySingle;
