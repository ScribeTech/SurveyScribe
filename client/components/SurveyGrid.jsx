import React from 'react';
import SurveySingle from './SurveySingle.jsx';

const Survey = React.createClass({

  componentDidMount() {
    console.log("props", this.props.surveys);
  },

  render() {
    return (
      <div>
        <p>Survey</p>
        <div className="SurveyList">
          {this.props.surveys.map((survey) => {
            return <SurveySingle surveysingle={survey} />;
          })}
        </div>
      </div>
    );
  }
});

export default Survey;
