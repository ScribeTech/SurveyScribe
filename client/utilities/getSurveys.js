import { browserHistory } from 'react-router';
import { normalize, denormalize } from './normalize';

export const getSurveys = (props, url) => {
  fetch('/api/surveys', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then((result) => {
    const converted = normalize(result);
    // Adding survey to state and changing the view to edit
    props.updateState(converted.surveys, converted.questions, converted.options);
    if (url) {
      browserHistory.push(url);
    }
  })
  .catch((error) => {
    throw error;
  });
};

export const updateSurvey = (props, survey, url) => {
  fetch(`/api/surveys/${props.params.surveyID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(denormalize(survey, props.questions, props.options))
  })
  .then(() => {
    if (url) {
      getSurveys(props, url);
    }
  });
};
