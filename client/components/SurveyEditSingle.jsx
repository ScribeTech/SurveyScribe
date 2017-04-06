import React from 'react';
import SurveyEditSingle from './SurveyEditSingle.jsx';

const EditSingle = (props) => {
  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'

    },
    gridList: {
      width: 1000,
      padding: 25
    },
    paper: {
      height: 200,
      width: 800,
      margin: 10,
      textAlign: 'center',
      display: 'inline-block'
    }
  };

  return (
    <div>
      {props.survey.title}
      {props.questions[props.survey.id].map((question) => (
        <div>
          <div>
            {question.label}
          </div>
          {props.options[0][question.id].map((option) => (
            <div>
              {option}
            </div>
          ))}
        </div>
      ))}
    </div> 
  );
};

export default EditSingle;
