import React from 'react';
import SurveySingle from './SurveySingle.jsx';


const Survey = (props) => {
  const concomponentDidMount = () => {
    console.log('props', props.surveys);
  };

  return (
    <div>
      <p>Survey</p>
      <div className="SurveyList">
        {props.surveys.map((survey, i) => {
          return <SurveySingle surveysingle={survey} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Survey;
