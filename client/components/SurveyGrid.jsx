import React from 'react';
import SurveySingle from './SurveySingle.jsx';


const Survey = (props) => {

  const concomponentDidMount = () => {
    console.log("props", props.surveys);
  };

  return (
    <div>
      <p>Survey</p>
      <div className="SurveyList">
        {props.surveys.map((survey) => {
          return <SurveySingle surveysingle={survey} />;
        })}
      </div>
    </div>
  );
};

export default Survey;
